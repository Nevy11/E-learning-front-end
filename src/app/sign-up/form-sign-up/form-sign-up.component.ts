import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'nevy11-form-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './form-sign-up.component.html',
  styleUrl: './form-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignUpComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
  });
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  errorMessage = signal('');
  constructor() {
    merge(
      this.signUpForm.controls.email.valueChanges,
      this.signUpForm.controls.email.statusChanges,
      this.signUpForm.controls.password.valueChanges,
      this.signUpForm.controls.password.statusChanges,
      this.signUpForm.controls.username.valueChanges,
      this.signUpForm.controls.username.statusChanges
    ).subscribe(() => this.errorMessage());
  }
  updateErrorMessage() {
    if (
      this.signUpForm.get('email')?.hasError('required') ||
      this.signUpForm.get('password')?.hasError('required') ||
      this.signUpForm.get('username')?.hasError('required')
    ) {
      this.errorMessage.set('You must enter a value');
    } else if (this.signUpForm.get('email')?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
