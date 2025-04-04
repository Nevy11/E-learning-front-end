import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'nevy11-forget-password',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent {
  email_form = new FormGroup({
    email_field: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });
  errorMessage = signal('');
  updateErrorMessage() {
    if (this.email_form.controls.email_field.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email_form.controls.email_field.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
