import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './validators/password-match.validator';
import { emailUniqueValidator } from './validators/email-unique.validator';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-singup-page',
  imports: [ReactiveFormsModule],
  templateUrl: './singup-page.html',
  styleUrl: './singup-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingupPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly formUtils = FormUtils;

  signupForm: FormGroup = this.fb.group(
    {
      email: [
        '',
        [Validators.required, Validators.email],
        [emailUniqueValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  get email() { return this.signupForm.get('email')!; }
  get password() { return this.signupForm.get('password')!; }
  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    console.log('Registro exitoso:', this.signupForm.value);
    this.router.navigate(['/']);
  }
}
