import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailOtpVerifyComponent } from './sign-up/email-otp-verify/email-otp-verify.component';
import { EDashboardComponent } from './e-dashboard/e-dashboard.component';

export const routes: Routes = [
  {
    path: 'sign up',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: 'sign up',
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
];
