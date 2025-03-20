import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nevy11-form-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form-sign-up.component.html',
  styleUrl: './form-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignUpComponent {
  snackbar = inject(MatSnackBar);
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
  errorUsernameMessage = signal('');

  updateErrorMessage() {
    if (this.signUpForm.controls.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.signUpForm.get('email')?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  updateErrorUsername() {
    if (this.signUpForm.controls.username.hasError('required')) {
      this.errorUsernameMessage.set('You must enter a value');
    } else {
      this.errorUsernameMessage.set('');
    }
  }
  signUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.controls.email.value?.toString());
      this.signUpForm.reset();
    } else {
      console.log('missing');
      this.snackbar.open(
        'Fill in the missing forms or fill in appropriately',
        'Close',
        { duration: 3000 }
      );
    }
  }
}
