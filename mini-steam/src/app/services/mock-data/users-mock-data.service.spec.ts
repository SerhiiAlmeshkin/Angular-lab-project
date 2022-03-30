import { TestBed } from '@angular/core/testing';

import { UsersMockDataService } from './users-mock-data.service';

describe('UsersMockDataService', () => {
  let service: UsersMockDataService;
  const testUsersArray = [
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
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMockDataService);
    service.setUsers(testUsersArray);
  });


  it('should find if user with passed email exists, when findUserByEmail called', () => {
    expect(service.findUserByEmail(testUsersArray[0].email)).toEqual(testUsersArray[0])
  });

  it('should get all set users data, when getAllUsers called', () => {
    service.setUsers(testUsersArray);
    expect(service.getAllUsers()).toEqual(testUsersArray);
  });

});
