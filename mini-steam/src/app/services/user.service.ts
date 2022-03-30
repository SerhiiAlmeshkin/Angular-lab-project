import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UsersMockDataService } from './mock-data/users-mock-data.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private usersService: UsersMockDataService
  ) { }

  setCurrentUser(user: User) {
    this.currentUser$.next(user);
  }

  getFriends(): User[] {
    if (!this.currentUser$.value) {
      return [];
    }
    const friendsIDs = this.currentUser$.value.friends;
    return this.usersService.getUsersByIds(friendsIDs);
  }

  searchUsers(searchQuery: string): User[] {
    if (!this.currentUser$.value) {
      return [];
    }

    const CURRENT_USER_ID = this.currentUser$.value.id;

    const searchQueryToLowerCase = searchQuery.toLowerCase()
    return this.usersService.getAllUsers()
      .filter(user => user.username?.toLowerCase().includes(searchQueryToLowerCase)
        || user.email.toLowerCase().includes(searchQueryToLowerCase))
      .filter(user => user.id !== CURRENT_USER_ID);
  }

  addFriend(friendId: number) {
    if (!this.currentUser$.value) {
      return;
    }

    this.currentUser$.next({
      ...this.currentUser$.value,
      friends: [...this.currentUser$.value.friends, friendId]
    });
  }

  removeFriend(friendId: number) {
    if (!this.currentUser$.value) {
      return;
    }

   this.currentUser$.next({
      ...this.currentUser$.value,
      friends: this.currentUser$.value.friends.filter(id => id !== friendId)
    });
  }

}

export interface FoundUser extends User {
  isFriend: boolean;
}
