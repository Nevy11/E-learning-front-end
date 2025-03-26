import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpService } from '../../sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'nevy11-otp-verify-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './otp-verify-form.component.html',
  styleUrl: './otp-verify-form.component.scss',
})
export class OtpVerifyFormComponent implements OnInit {
  constructor(
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  email!: string;
  ngOnInit(): void {
    this.email = this.signUpService.userEmail;
  }
  otpInput = new FormGroup({
    otp_input: new UntypedFormControl('', [Validators.required]),
  });
  check_otp_match() {
    if (this.otpInput.controls.otp_input.value) {
      this.signUpService
        .verify_otp(
          this.signUpService.HashedOtp,
          this.otpInput.controls.otp_input.value
        )
        .subscribe((resp) => {
          console.log('response: \n', resp);
          if (resp.matches) {
            this.signUpService
              .signUpUser(
                this.signUpService.userEmail,
                this.signUpService.userPassword,
                this.signUpService.userName
              )
              .subscribe((resp) => {
                if (resp.is_successful) {
                  this.router.navigate(['dashboard']);
                  this.snackBar.open(
                    `Welcome ${resp.username} to E-learning platform`,
                    'Close',
                    { duration: 3000 }
                  );
                } else {
                  console.error(`${resp.message}`);
                  this.snackBar.open(
                    `Error while updating the user.. please try again`,
                    'Close',
                    { duration: 3000 }
                  );
                }
              });
          } else {
            this.otpInput.reset;
            this.snackBar.open(`Wrong otp`, 'Close', { duration: 30000 });
          }
        });
    } else {
      this.snackBar.open(`Fill in the otp`, 'Close', { duration: 3000 });
    }
  }
}
