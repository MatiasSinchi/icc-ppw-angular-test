import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

export function emailUniqueValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return of(control.value).pipe(
      delay(500),
      map((email: string) => {
        const takenEmails = ['user@example.com', 'admin@example.com', 'test@example.com'];
        return takenEmails.includes(email.toLowerCase()) ? { emailTaken: true } : null;
      })
    );
  };
}
