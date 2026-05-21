import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AvatarItem = {
  initials: string;
  color: string;
};

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroup {
  title = input<string>('Equipo');
  avatars = input<AvatarItem[]>([]);
  extra = input<number>(0);
}
