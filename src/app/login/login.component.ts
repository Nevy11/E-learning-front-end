import { Component, inject } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'nevy11-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  toForgetPassword() {
    this.router.navigate(['forget password']);
  }
}
