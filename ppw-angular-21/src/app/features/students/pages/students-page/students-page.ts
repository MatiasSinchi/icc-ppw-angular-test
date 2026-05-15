import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-page',
  imports: [RouterLink],
  templateUrl: './students-page.html',
  styleUrl: './students-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsPage {
  readonly students = signal([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie Davis' }
  ])
}
