import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserBody} from "../../shared/models/user-body";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
  })

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  onSubmit(){
    const newUser: UserBody = {
      name: this.userForm.value.firstname! + ' ' + this.userForm.value.lastname!,
      email: this.userForm.value.email!,
      phone: this.userForm.value.phone!
    }
    this.userService.createUser(newUser)
    this.router.navigate(['/'])
  }

  get fc(){
    return this.userForm.controls
  }
}
