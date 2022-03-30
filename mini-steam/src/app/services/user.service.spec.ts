import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {User, UsersMockDataService} from "./mock-data/users-mock-data.service";

describe('UserService', () => {
  let service: UserService;
  let usersMockDataServiceSpy: SpyObj<UsersMockDataService>;
  const testUser = {
    id: 5,
    email: 'new@gmail.com',
    password: '1234',
    username: 'NotAFriend',
    friends: [2],
    games: [1, 2, 3]
  }
  const testUserArray: User[] = [
    {
    "id": 1,
    "email": "admin@gmail.com",
    "password": "123",
    "username": "admin",
    "age": 60,
    "friends": [2, 3, 4],
    "games": [8, 9, 10]
    },
    {
      "id": 2,
      "email": "user@gmail.com",
      "password": "1234",
      "age": 30,
      "friends": [1, 5, 6],
      "games": [1, 2, 3]
    }
  ]

  beforeEach(() => {
    usersMockDataServiceSpy = createSpyObj('UsersMockDataService', ['getUsersByIds', 'getAllUsers'])
    TestBed.configureTestingModule({
      providers: [{
        provide: UsersMockDataService, useValue: usersMockDataServiceSpy
      }]
    });
    service = TestBed.inject(UserService);
  });

  it('should set current user context when setCurrentUser called', () => {
    service.setCurrentUser(testUser)
    expect(service.currentUser$.value).toEqual(testUser);
  });

  describe('getFriends', () => {
    it('should return empty array when no current user context set when getFriends called', () => {
      expect(service.getFriends()).toEqual([]);
    });

    it('should call getUsersByIds with friends of current user when getFriends called', () => {
      service.currentUser$.next(testUser);
      service.getFriends();
      expect(usersMockDataServiceSpy.getUsersByIds).toHaveBeenCalledWith(testUser.friends);
    });
  })


  describe('searchUsers', () => {
    it('should not search users if no current user set, when searchUsers called', ()=> {
      expect(service.searchUsers('')).toEqual([]);
    })

    it('should find user case insensitive by username or by email', () => {
      service.currentUser$.next(testUser)
      usersMockDataServiceSpy.getAllUsers.and.returnValue(testUserArray)
      expect(service.searchUsers('admin')).toEqual([testUserArray[0]]);
      expect(service.searchUsers('AdMiN')).toEqual([testUserArray[0]]);
      expect(service.searchUsers('user')).toEqual([testUserArray[1]]);
      expect(service.searchUsers('UsEr')).toEqual([testUserArray[1]]);
    });
  })

  describe('addFriend', () => {
    it('should not add friend if no current user set, when addFriend called', ()=> {
      const currentUserNext = spyOn(service.currentUser$, 'next');
      service.addFriend(1);
      expect(currentUserNext).not.toHaveBeenCalled();
    })

    it('should add friend if current user set, when addFriend called', ()=> {
      service.currentUser$.next(testUser);
      service.addFriend(69);
      expect(service.currentUser$.value!.friends).toContain(69);
    })
  })

  describe('removeFriend', () => {
    it('should not remove friend if no current user set, when removeFriend called', ()=> {
      const currentUserNext = spyOn(service.currentUser$, 'next');
      service.removeFriend(1);
      expect(currentUserNext).not.toHaveBeenCalled();
    })

    it('should remove friend if current user set, when removeFriend called', ()=> {
      service.currentUser$.next(testUser);
      service.removeFriend(testUser.friends[0]);
      expect(service.currentUser$.value!.friends).not.toContain(testUser.friends[0]);
    })
  })
});
