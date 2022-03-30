import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import SpyObj = jasmine.SpyObj;

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: SpyObj<Router>;
  let authServiceSpy: SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'parseUrl']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn'])

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  describe(`canActivate`, () => {
    it(`should return to root when user is logged in and on login page`, () => {
      authServiceSpy.isLoggedIn.and.returnValue(true)
      guard.canActivate({routeConfig: {path: 'login'}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/')
    })

    it(`shouldn't return to root when user is logged in and not on login page`, () => {
      authServiceSpy.isLoggedIn.and.returnValue(true)
      guard.canActivate({routeConfig: {path: ''}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      expect(routerSpy.parseUrl).not.toHaveBeenCalledWith('/')
    })

    it(`should return to login when user is not logged in and not on login page`, () => {
      authServiceSpy.isLoggedIn.and.returnValue(false)
      guard.canActivate({routeConfig: {path: ''}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login')
    })

    it(`should return to login when user is not logged in and not on login page`, () => {
      authServiceSpy.isLoggedIn.and.returnValue(false)
      guard.canActivate({routeConfig: {path: ''}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login')
    })

    it(`shouldn't return to login when user is logged in and not on login page`, () => {
      authServiceSpy.isLoggedIn.and.returnValue(true)
      guard.canActivate({routeConfig: {path: ''}} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
      expect(routerSpy.parseUrl).not.toHaveBeenCalledWith('/login')
    })
  })

  describe(`canActivateChild`, () => {
    it(`should call canActivate when canActivateChild called`, () => {
      const testRoute = {routeConfig: {path: 'test'}} as ActivatedRouteSnapshot;
      const testRouterSnapshot = {url: 'test'} as RouterStateSnapshot
      const canActivateSpy = spyOn(guard, 'canActivate');
      guard.canActivateChild(testRoute, testRouterSnapshot)
      expect(canActivateSpy).toHaveBeenCalledWith(testRoute, testRouterSnapshot)
    })
  });
});
