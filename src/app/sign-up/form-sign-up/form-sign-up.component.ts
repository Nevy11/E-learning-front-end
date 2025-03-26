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
import { SignUpService } from '../sign-up.service';

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
  constructor(private signUpService: SignUpService) {}
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
      /// Check to see if password is not blank
      if (this.signUpForm.controls.password.value) {
        /// hashes the passwords
        this.signUpService
          .hash_password(this.signUpForm.controls.password.value)
          .subscribe((data) => {
            /// stores the hashed password in angular
            this.signUpService.userPassword = data.hashed_value;
            /// Checks to see if email and username field is not blank
            if (
              this.signUpForm.controls.email.value &&
              this.signUpForm.controls.username.value
            ) {
              /// stores user email and user name
              this.signUpService.userName =
                this.signUpForm.controls.username.value;
              this.signUpService.userEmail =
                this.signUpForm.controls.email.value;
              /// send the otp to the user's email address
              this.signUpService
                .send_otp(this.signUpService.userEmail)
                .subscribe((resp) => {
                  /// check to see if the request was a success
                  if (resp.is_success) {
                    /// store the returned hashed otp in the client
                    this.signUpService.HashedOtp = resp.hashed_otp;
                  } else {
                    /// handle any failure as a result of otp error
                    this.snackbar.open(`${resp.message}`, 'Close', {
                      duration: 3000,
                    });
                  }
                });
            } else {
              /// handles any error relating to the missing form
              this.snackbar.open('Fill in the missing forms', 'Close', {
                duration: 3000,
              });
            }
          });
      } else {
        this.snackbar.open('Fill in the missing forms', 'Close', {
          duration: 3000,
        });
      }

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
