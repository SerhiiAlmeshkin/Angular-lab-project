import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {User} from "../../services/mock-data/users-mock-data.service";


@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  profileForm = this.fb.group({
    username: ['', [Validators.max(32), Validators.min(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['']
  });

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if (!user) {
        return;
      }
      const { username, email, age } = user
      this.profileForm.setValue({
        username,
        email,
        age
      })
    });
  }

  onSubmit() {
    if(!this.userService.currentUser$.value) {
      return
    }
    const updatedCurrentUser: User = {
      ...this.userService.currentUser$.value,
      username : this.profileForm.value.username as string,
      email : this.profileForm.value.email as string,
      age : this.profileForm.value.age as number
    }
    this.userService.setCurrentUser(updatedCurrentUser)
  }

}

