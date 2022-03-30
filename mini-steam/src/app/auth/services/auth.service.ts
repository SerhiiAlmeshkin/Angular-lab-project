import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UsersMockDataService } from '../../services/mock-data/users-mock-data.service';
import { createCookie, getCookie } from '../../utils/cookie';

export const LOGGED_IN_USER_ID_COOKIE_NAME = 'loggedInUserID';
export const LOGGED_IN_USER_COOKIE_MAX_AGE_IN_SEC = String(60*1000)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private usersService: UsersMockDataService,
    private userService: UserService
  ) { }

  async login(email: string, password: string) {
    const foundUser = this.usersService.findUserByEmail(email);
    if (!foundUser) {
      this._snackBar.open('User not found', 'Close');
      return;
    }

    if (foundUser.password === password) {
      createCookie({
        value: foundUser.id,
        name: LOGGED_IN_USER_ID_COOKIE_NAME,
        maxAgeInSec: LOGGED_IN_USER_COOKIE_MAX_AGE_IN_SEC
      });
      this.userService.setCurrentUser(foundUser);
      await this.router.navigateByUrl('/');
    } else {
      this._snackBar.open('Password is incorrect', 'Close');
    }
  }

  isLoggedIn() {
    return !!this.getLoggednInUserId();
  }

  getLoggednInUserId() {
    return getCookie(LOGGED_IN_USER_ID_COOKIE_NAME);
  }
}
