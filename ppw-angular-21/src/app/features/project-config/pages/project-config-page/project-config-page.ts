import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../shared/utils/form-utils';

function minLengthArray(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const arr = control as FormArray;
    return arr.length >= min ? null : { minLengthArray: { requiredLength: min, actualLength: arr.length } };
  };
}

@Component({
  selector: 'app-project-config-page',
  imports: [ReactiveFormsModule],
  templateUrl: './project-config-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectConfigPage {
  private fb = inject(FormBuilder);
  readonly formUtils = FormUtils;

  newLenguaje = new FormControl('');

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    lenguajes: this.fb.array(
      [
        this.fb.control('JavaScript', Validators.required),
        this.fb.control('TypeScript', Validators.required),
      ],
      [minLengthArray(2)]
    ),
    tipo: ['fullstack', Validators.required],
    notificaciones: [true],
    terminosAceptados: [false, Validators.requiredTrue],
  });

  get lenguajes(): FormArray {
    return this.myForm.get('lenguajes') as FormArray;
  }

  onAddLenguaje(): void {
    const val = this.newLenguaje.value?.trim();
    if (!val) return;
    this.lenguajes.push(this.fb.control(val, Validators.required));
    this.newLenguaje.reset();
  }

  onDeleteLenguaje(index: number): void {
    this.lenguajes.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
