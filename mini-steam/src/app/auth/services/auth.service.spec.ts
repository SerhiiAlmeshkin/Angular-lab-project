import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersMockDataService } from '../../services/mock-data/users-mock-data.service';
import { UserService } from '../../services/user.service';
import {AuthService, LOGGED_IN_USER_COOKIE_MAX_AGE_IN_SEC, LOGGED_IN_USER_ID_COOKIE_NAME} from './auth.service';

import * as cookies from '../../utils/cookie';
import SpyObj = jasmine.SpyObj;


describe('AuthService', () => {
  let service: AuthService;
  let userServiceSpy: SpyObj<UserService>;
  let usersMockDataServiceSpy: SpyObj<UsersMockDataService>;
  let snackbarSpy: SpyObj<MatSnackBar>;
  let routerSpy: SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    usersMockDataServiceSpy = jasmine.createSpyObj('UsersMockDataService', ['findUserByEmail']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['setCurrentUser']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: UsersMockDataService, useValue: usersMockDataServiceSpy }
      ]
    });

    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    TestBed.inject(UsersMockDataService);
    TestBed.inject(UserService);
    service = TestBed.inject(AuthService);
  });

  it('should return true if user is logged in when isLoggedIn called', () => {
    spyOn(service, 'getLoggednInUserId').and.returnValue(1);
    const result = service.isLoggedIn();
    expect(result).toBeTrue();
  });

  it('should return user id of logged in user when getLoggednInUserId called', () => {
    const testCookieID = 1;

    spyOn(cookies, 'getCookie').and.returnValue(testCookieID);
    const result = service.getLoggednInUserId();
    expect(result).toBe(testCookieID);
  });

  describe('login method', () => {
    const testUser = {
        id: 5,
        email: 'new@gmail.com',
        password: '1234',
        username: 'NotAFriend',
        friends: [2],
        games: [1, 2, 3]
    }
    const testCookie = {
      value: testUser.id,
      name: LOGGED_IN_USER_ID_COOKIE_NAME,
      maxAgeInSec: LOGGED_IN_USER_COOKIE_MAX_AGE_IN_SEC
    }

    it('should call findUserByEmail with email from params', () => {
      service.login('test@email.com', 'testpass');
      expect(usersMockDataServiceSpy.findUserByEmail).toHaveBeenCalledWith('test@email.com');
    });

    it('should show snackbar and quit function if user not found', () => {
      const notExistingUserEmail = 'test@email.com';

      usersMockDataServiceSpy.findUserByEmail.and.returnValue(undefined);
      service.login(notExistingUserEmail, testUser.password);
      expect(snackbarSpy.open).toHaveBeenCalledWith('User not found', 'Close');
    });

    it('should show snackbar and quit function if password incorrect', () => {
      const incorrectPassword = 'wrongPassword'

      usersMockDataServiceSpy.findUserByEmail.and.returnValue(testUser);
      service.login(testUser.email, incorrectPassword);
      expect(snackbarSpy.open).toHaveBeenCalledWith('Password is incorrect', 'Close');
    });

    it('should create user session and navigate to root', () => {
      usersMockDataServiceSpy.findUserByEmail.and.returnValue(testUser);

      const createCookieSpy = spyOn(cookies, 'createCookie');
      service.login(testUser.email, testUser.password);

      expect(userServiceSpy.setCurrentUser).toHaveBeenCalledWith(testUser);

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');

      expect(createCookieSpy).toHaveBeenCalledWith(testCookie);
    });
  });
});
