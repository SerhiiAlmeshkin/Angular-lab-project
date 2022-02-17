import { Injectable } from '@angular/core';
import * as users from '../../mock-data/users.json';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = Array.from(users);

  constructor() { }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  age: number;
  friends: number[];
}
