import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type StatItem = {
  title: string;
  value: string;
  desc: string;
};

@Component({
  selector: 'app-daisyui-stats',
  templateUrl: './daisyui-stats.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiStats {
  stats = input<StatItem[]>([]);
}
