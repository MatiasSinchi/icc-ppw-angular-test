import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SimpsonsService } from '../../service/simpons.service';
import { SimpsonsResponse } from '../../models/simpsons.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { PaginationService } from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-simpsons-page',
  imports: [RouterModule],
  templateUrl: './simpsons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpsonsPage {

  // Inyectamos el servicio una sola vez en el componente.
  private simpsonsService = inject(SimpsonsService);
  paginationService = inject(PaginationService);  // público: el template lo usa

  readonly charactersPerPage = signal(10);

  simpsonsResource = rxResource<SimpsonsResponse, { page: number; limit: number }>({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.charactersPerPage(),
    }),
    stream: ({ params }) =>
      this.simpsonsService.getCharactersOptions({
        page: params.page,
        limit: params.limit,
      }),
  });

  concatImagen(ruta: string) {
  let rutaCompleta = `https://cdn.thesimpsonsapi.com/500${ruta}`;
  return rutaCompleta.toString();
}
}

