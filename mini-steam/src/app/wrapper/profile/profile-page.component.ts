import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  profileForm = this.fb.group({
    username: ['', [Validators.max(32), Validators.min(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.pattern(/^\d+$/g)]]
  });

  ngOnInit(): void {
    if (this.authService.loggedInUser) {
      const {username, email, age} = this.authService.loggedInUser
        this.profileForm.setValue({
          username,
          email,
          age
        })
    }
  }

  onSubmit() {
    console.log(this.profileForm.value)
  }

}

