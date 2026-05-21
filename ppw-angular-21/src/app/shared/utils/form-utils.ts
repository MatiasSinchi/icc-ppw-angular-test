import { FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!control && control.invalid && control.touched;
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean {
    const control = formArray.at(index);
    return !!control && control.invalid && control.touched;
  }

  static getFieldError(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (!control) return '';
    return FormUtils.getTextError(control.errors);
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string {
    const control = formArray.at(index);
    if (!control) return '';
    return FormUtils.getTextError(control.errors);
  }

  static getTextError(errors: Record<string, unknown> | null): string {
    if (!errors) return '';

    if (errors['required']) return 'Este campo es requerido.';
    if (errors['requiredTrue']) return 'Este campo es obligatorio.';
    if (errors['email']) return 'Ingresa un correo electrónico válido.';
    if (errors['minlength']) {
      const min = (errors['minlength'] as { requiredLength: number }).requiredLength;
      return `Mínimo ${min} caracteres.`;
    }
    if (errors['maxlength']) {
      const max = (errors['maxlength'] as { requiredLength: number }).requiredLength;
      return `Máximo ${max} caracteres.`;
    }
    if (errors['min']) {
      const min = (errors['min'] as { min: number }).min;
      return `El valor mínimo es ${min}.`;
    }
    if (errors['max']) {
      const max = (errors['max'] as { max: number }).max;
      return `El valor máximo es ${max}.`;
    }
    if (errors['emailTaken']) return 'Este correo ya está registrado.';
    if (errors['passwordMismatch']) return 'Las contraseñas no coinciden.';

    return 'Campo inválido.';
  }
}
