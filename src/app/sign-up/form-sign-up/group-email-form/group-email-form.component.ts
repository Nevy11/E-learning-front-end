import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'nevy11-group-email-form',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './group-email-form.component.html',
  styleUrl: './group-email-form.component.scss',
})
export class GroupEmailFormComponent {
  email_group = new FormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
  });
  errorMessage = signal('');
  errorPasswordMessage = signal('');
  updateErrorMessage() {
    if (this.email_group.controls.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email_group.controls.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  updateErrorPasswordMessage() {
    if (this.email_group.controls.password.hasError('required')) {
      this.errorPasswordMessage.set('You must enter a password');
    } else if (this.email_group.controls.password.hasError('minLength')) {
      this.errorPasswordMessage.set('The password must be more');
    } else {
      this.errorPasswordMessage.set('');
    }
  }
}
