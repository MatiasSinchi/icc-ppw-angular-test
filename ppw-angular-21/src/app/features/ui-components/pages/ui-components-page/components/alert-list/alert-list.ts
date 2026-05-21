import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AlertItem = {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertList {
  title = input<string>('Alertas del sistema');
  alerts = input<AlertItem[]>([]);
}
