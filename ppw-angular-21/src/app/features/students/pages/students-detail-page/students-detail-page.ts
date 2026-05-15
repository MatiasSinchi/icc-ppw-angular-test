import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-detail-page',
  imports: [RouterLink],
  templateUrl: './students-detail-page.html',
    styleUrl: './students-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsDetailPage {
  //permite leer parametros de la ruta, como el id del estudiante
  private route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.paramMap.get('id');
}
