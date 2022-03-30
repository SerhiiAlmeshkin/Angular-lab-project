import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FoundUser, UserService } from '../../services/user.service';
import { User } from '../../services/mock-data/users-mock-data.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit, OnDestroy {
  searchField = new FormControl('');
  foundUsers: FoundUser[] = [];
  currentUserFriends: User[] = [];

  private destroy$ = new Subject();

  constructor(
    private userService: UserService
  ) {
    this.userService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((() => {
      this.currentUserFriends = this.userService.getFriends();
      const currentUserFriendsIds = this.currentUserFriends.map(friend => friend.id);
      this.foundUsers = this.foundUsers.map(foundUser => {
        return {
          ...foundUser,
          isFriend: currentUserFriendsIds.includes(foundUser.id)
        };
      });
    }));
  }


  addFriend(friendID: number) {
    this.userService.addFriend(friendID);
  }

  removeFriend(friendID: number) {
    this.userService.removeFriend(friendID);
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((searchQuery) => {
      this.foundUsers = this.userService.searchUsers(searchQuery).map(foundUser => {
        return {
          ...foundUser,
          isFriend: !!this.currentUserFriends.find(friend => friend.id === foundUser.id)
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
