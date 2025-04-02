import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'nevy11-login-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  // button
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Form group
  login_form = new FormGroup({
    username_field: new UntypedFormControl('', [Validators.required]),
    password_field: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // handling username error
  username_err = signal('');
  updateUsernameErr() {
    if (this.login_form.controls.username_field.hasError('required')) {
      this.username_err.set('Username cannot be blank');
    } else {
      this.username_err.set('');
    }
  }

  // handling password error
  password_err = signal('');
  updatePasswordErr() {
    if (this.login_form.controls.password_field.hasError('required')) {
      this.password_err.set('Password field cannot be blank');
    } else if (this.login_form.controls.password_field.hasError('minlength')) {
      this.password_err.set('password must be longer than 6 characters');
    } else {
      this.password_err.set('');
    }
  }

  // login function
  login() {
    if (this.login_form.valid) {
      this.router.navigate(['dashboard']);
    } else {
      this.snackbar.open('please fill in the missing fields', `Close`, {
        duration: 3000,
      });
    }
  }

  // sign function
  signUp() {
    this.router.navigate(['sign up']);
  }
}
