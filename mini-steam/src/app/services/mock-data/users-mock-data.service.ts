import { Injectable } from '@angular/core';
import * as users from '../../../mock-data/users.json';



@Injectable({
  providedIn: 'root'
})
export class UsersMockDataService {
  private users: User[] = [];
  constructor() {
    this.setUsers(Array.from(users));
  }

  setUsers(userArray: User[]) {
    this.users = userArray;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  getUsersByIds(ids: number[]): User[] {
    return this.users.filter(user => ids.includes(user.id))
  }

  getAllUsers(): User[] {
    return this.users;
  }
}

export interface User {
  id: number;
  email: string;
  password: string;
  username?: string;
  age?: number;
  friends: number[];
  games: number[];
}


