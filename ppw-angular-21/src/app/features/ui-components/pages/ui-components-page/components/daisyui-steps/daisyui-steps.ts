import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-daisyui-steps',
  templateUrl: './daisyui-steps.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiSteps {
  title = input<string>('Flujo del proceso');
  steps = input<string[]>([]);
  activeStep = input<number>(0);
}
