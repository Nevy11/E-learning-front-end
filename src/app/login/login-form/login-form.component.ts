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
import { LoginService } from '../login.service';

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
  loginService = inject(LoginService);
  router = inject(Router);
  // button
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Form group
  login_form = new FormGroup({
    useremail_field: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password_field: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // handling  error
  userEmailErr = signal('');
  updateEmailErr() {
    if (this.login_form.controls.useremail_field.hasError('required')) {
      this.userEmailErr.set('Email cannot be blank');
    } else if (this.login_form.controls.useremail_field.hasError('email')) {
      this.userEmailErr.set('Not a valid email');
    } else {
      this.userEmailErr.set('');
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
      this.loginService
        .login_user({
          email_address: this.login_form.controls.useremail_field.value,
          password: this.login_form.controls.password_field.value,
        })
        .subscribe((resp) => {
          if (resp.is_success) {
            if (resp.is_correct) {
            } else {
              this.snackbar.open(``);
            }
          } else {
            this.snackbar.open(
              `Error while updating the user's password`,
              'Close',
              { duration: 3000 }
            );
          }
        });
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

/// update user's forget password to send an otp back to the user
/// verify the otp
/// collect the user's password and update it if the otp matches
/// navigate the user to dashboard with a message of updated successfully
