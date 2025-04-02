import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailOtpVerifyComponent } from './sign-up/email-otp-verify/email-otp-verify.component';
import { EDashboardComponent } from './e-dashboard/e-dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'sign up',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'otpVerification',
    component: EmailOtpVerifyComponent,
  },
  {
    path: 'dashboard',
    component: EDashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
