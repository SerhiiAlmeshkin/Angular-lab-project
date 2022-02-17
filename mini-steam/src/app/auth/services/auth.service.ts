import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UsersService } from '../../services/users.service';
import { createCookie, getCookie } from '../../utils/cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,  private _snackBar: MatSnackBar, private usersService: UsersService) { }

  loggedInUser: User | undefined;

  async login(email: string, password: string) {
    const foundUser = this.usersService.findUserByEmail(email)
    if (!foundUser) {
      this._snackBar.open('User not found', 'Close');
      return;
    }

    if (foundUser && foundUser.password === password) {
      createCookie({
        value: 'true',
        name: 'isLoggedIn',
        maxAgeInSec: String(60 * 5)
      })
      this.loggedInUser = foundUser;
      await this.router.navigateByUrl('/')
    } else {
      this._snackBar.open('Password is incorrect', 'Close');
    }
  }

  isLoggedIn() {
    return getCookie('isLoggedIn')
  }
}
