import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormSignUpComponent } from './form-sign-up/form-sign-up.component';

@Component({
  selector: 'nevy11-sign-up',
  imports: [FormSignUpComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {}
