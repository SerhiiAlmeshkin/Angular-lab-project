import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComponent } from './friends.component';
import {UserService} from "../../services/user.service";
import SpyObj = jasmine.SpyObj;
import {User} from "../../services/mock-data/users-mock-data.service";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import Spy = jasmine.Spy;

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let userServiceSpy: SpyObj<UserService>;
  let currentUser$: BehaviorSubject<User | null>
  const testUser = {
    "id": 1,
    "email": "admin@gmail.com",
    "password": "123",
    "username": "admin",
    "age": 60,
    "friends": [2],
    "games": [8, 9, 10]
  };
  const testUserArray = [
    {
      "id": 2,
      "email": "user@gmail.com",
      "password": "1234",
      "age": 30,
      "friends": [1, 5, 6],
      "games": [1, 2, 3]
    }
  ]
  const testUserID = 99;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService',
      ['addFriend', 'removeFriend', 'getFriends', 'searchUsers'],
      ['currentUser$']);
    currentUser$ = new BehaviorSubject<User | null>(null);
    (Object.getOwnPropertyDescriptor(
      userServiceSpy,
      'currentUser$'
    )?.get as Spy<any>).and.returnValue(currentUser$);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatCardModule, MatButtonModule,
        MatFormFieldModule,
        MatInputModule, BrowserAnimationsModule],
      declarations: [ FriendsComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService.addFriend with user, who is being added to friends, when addFriend called',
    () => {
    component.addFriend(testUserID);
    expect(userServiceSpy.addFriend).toHaveBeenCalledWith(testUserID);
  });

  it('should call UserService.removeFriend with user, who is being removed from friends, when removeFriend called',
    () => {
    component.removeFriend(testUserID)
    expect(userServiceSpy.removeFriend).toHaveBeenCalledWith(testUserID);
  });

  it('should set foundUsers according to a search query and friends of current user',
    () => {
    userServiceSpy.getFriends.and.returnValue(testUserArray)
    userServiceSpy.searchUsers.and.returnValue(testUserArray)
    currentUser$.next(testUser);
    component.ngOnInit();
    component.searchField.setValue('')

    expect(component.foundUsers[0].id).toBe(testUserArray[0].id)
  });
});
