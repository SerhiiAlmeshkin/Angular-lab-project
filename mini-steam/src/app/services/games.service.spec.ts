import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { GamesService } from './games.service';
import SpyObj = jasmine.SpyObj;
import { GamesMockDataService } from './mock-data/games-mock-data.service';
import { User } from './mock-data/users-mock-data.service';
import createSpyObj = jasmine.createSpyObj;
import { UserService } from './user.service';
import Spy = jasmine.Spy;


describe('GamesService', () => {
  let service: GamesService;
  let userServiceSpy: SpyObj<UserService>;
  let gamesMockDataServiceSpy: SpyObj<GamesMockDataService>;
  const testUser = {
    id: 5,
    email: 'new@gmail.com',
    password: '1234',
    username: 'NotAFriend',
    friends: [2],
    games: [1]
  };
  const testGamesArray = [
    {
      "id": 1,
      "name": "Indie Game",
      "price": 200,
      "description": "Hell’s armies have invaded Earth.",
      "tags": ["Indie"]
    }
  ]
  const testGameId = 999;
  const testSearchQuery = 'Indie';
  const testSearchCategory = { Indie: true };
  const testSearchPrice = 200;


  beforeEach(() => {
    userServiceSpy = createSpyObj('UserService', ['setCurrentUser'], ['currentUser$']);
    gamesMockDataServiceSpy = createSpyObj(
      'GamesMockDataService',
      ['getAllGames']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: GamesMockDataService, useValue: gamesMockDataServiceSpy }
      ]
    });
    service = TestBed.inject(GamesService);
  });

  describe('addGameToLibrary', () => {
    it(
      'should not add game to library of user, if current user is not set, when addGameToLibrary called',
      () => {
        const next = jasmine.createSpy('next', () => null);
        (Object.getOwnPropertyDescriptor(
          userServiceSpy,
          'currentUser$'
        )?.get as Spy<any>).and.returnValue({ value: null, next });
        service.addGameToLibrary(testGameId);
        expect(next).not.toHaveBeenCalled();
      }
    );

       it('should add game to library of user, when addGameToLibrary called',
         ()=> {
           const next = jasmine.createSpy('next', ({}) => null);
           (Object.getOwnPropertyDescriptor(
             userServiceSpy,
             'currentUser$'
           )?.get as Spy<any>).and.returnValue({ value: testUser, next });

           userServiceSpy.setCurrentUser(testUser);
           service.addGameToLibrary(testGameId);

           expect(next).toHaveBeenCalledWith({ ...testUser,
             games: [...testUser.games, testGameId]});
         })
  });

  describe('getGamesInLibrary', () => {
    it(
      'should have no games in library, if current user is not set, when getGamesInLibrary called',
      () => {
        (Object.getOwnPropertyDescriptor(
          userServiceSpy,
          'currentUser$'
        )?.get as Spy<any>).and.returnValue(new BehaviorSubject(null));

        expect(service.getGamesInLibrary()).toEqual([])
      }
    );

    it('should get games in library from current user',
      ()=> {
        (Object.getOwnPropertyDescriptor(
          userServiceSpy,
          'currentUser$'
        )?.get as Spy<any>).and.returnValue(new BehaviorSubject(testUser));

        gamesMockDataServiceSpy.getAllGames.and.returnValue(testGamesArray)

        service.getGamesInLibrary();
        expect(service.getGamesInLibrary()).toEqual(testGamesArray)
      })
  });

  describe('searchGames', () => {
    it(
      'should search games according to search query, categories, price parameters',
      () => {
        (Object.getOwnPropertyDescriptor(
          userServiceSpy,
          'currentUser$'
        )?.get as Spy<any>).and.returnValue(new BehaviorSubject(null));

        gamesMockDataServiceSpy.getAllGames.and.returnValue(testGamesArray);
        expect(service.searchGames(testSearchQuery, testSearchPrice, testSearchCategory)).toEqual(testGamesArray);
      }
    );
  });
});
