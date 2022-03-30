import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { UsersMockDataService } from '../services/mock-data/users-mock-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit {

  constructor(private user: UserService, private authService: AuthService, private users: UsersMockDataService) {
    const loggedInUserId = Number (this.authService.getLoggednInUserId())
    const [loggedInUser] = this.users.getUsersByIds([loggedInUserId])
    this.user.setCurrentUser(loggedInUser)
  }

  ngOnInit(): void {}

}
