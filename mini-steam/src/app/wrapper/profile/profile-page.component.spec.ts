import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../services/mock-data/users-mock-data.service';
import { UserService } from '../../services/user.service';
import { ProfilePageComponent } from './profile-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import SpyObj = jasmine.SpyObj;
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import Spy = jasmine.Spy;


describe('ProfileComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let userServiceSpy: SpyObj<UserService>;
  let currentUser$: BehaviorSubject<User | null>
  const testUser = {
    "id": 1,
    "email": "admin@gmail.com",
    "password": "123",
    "username": "admin",
    "age": 60,
    "friends": [2, 3, 4],
    "games": [8, 9, 10]
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['setCurrentUser'],
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
      declarations: [ ProfilePageComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        FormBuilder
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form values (username, email, age) according to current user values when ngOnInit caleld',
    () => {
    currentUser$.next(testUser);

    component.ngOnInit();
    expect(component.profileForm.value)
      .toEqual({username: testUser.username, email: testUser.email, age: testUser.age})
  });


  describe('onSubmit', () => {
    it('should not update current user info, if no current user',  () => {
      currentUser$.next(null);
      component.ngOnInit();
      component.onSubmit();

      expect(userServiceSpy.setCurrentUser).not.toHaveBeenCalled();
    });

    it('should update current user info with corresponding profile form values, when onSubmit called',
      () => {
        currentUser$.next(testUser)
        component.ngOnInit();
        component.onSubmit();

        expect(userServiceSpy.setCurrentUser).toHaveBeenCalledWith(testUser);
    });
  })
});
