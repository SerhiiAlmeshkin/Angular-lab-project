import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';
import { LoginPageComponent } from './login-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import SpyObj = jasmine.SpyObj;


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authServiceSpy: SpyObj<AuthService>;
  const invalidEmail = 'invalidEmail';
  const testUserCredentials = {
    email: 'testuser@mail.ru',
    password: 'TestPassword1'
  }

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatCardModule, MatButtonModule,
        MatFormFieldModule,
        MatInputModule, BrowserAnimationsModule],
      declarations: [LoginPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.login when onSubmit called', () => {
    component.loginForm.setValue(testUserCredentials);
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith(testUserCredentials.email, testUserCredentials.password);
  });

  it('should show validation error if email is invalid', async () => {
    const emailElement: HTMLInputElement = fixture.debugElement
      .nativeElement.querySelector(`[data-unit=login-email]`);
    emailElement.value = invalidEmail;
    emailElement.dispatchEvent(new Event('input'));
    emailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
    const emailInvalidElement: HTMLInputElement = fixture.debugElement
      .nativeElement.querySelector(`[data-unit=email-invalid]`);
    expect(component.loginForm.get('email')?.errors!['email']).toBeTruthy();
    expect(emailInvalidElement).toBeTruthy();
  });


});
