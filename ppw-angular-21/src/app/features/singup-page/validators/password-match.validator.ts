import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  form: AbstractControl
): ValidationErrors | null {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (!password || !confirmPassword) return null;
  if (!password.value || !confirmPassword.value) return null;

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}
