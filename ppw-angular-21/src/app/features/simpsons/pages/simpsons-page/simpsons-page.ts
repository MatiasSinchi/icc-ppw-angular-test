import { ChangeDetectionStrategy, Component } from '@angular/core';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SimpsonsService, SimpsonsCharacter } from '../../service/simpons.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simpsons-page',
  imports: [RouterLink],
  templateUrl: './simpsons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpsonsPage {

  // Inyectamos el servicio una sola vez en el componente.
  private simpsonsService = inject(SimpsonsService);

  // rxResource conecta Observable -> estado reactivo (loading, error, value).
  simpsonsResource = rxResource<SimpsonsCharacter[], unknown>({
    // stream ejecuta la consulta de personajes de la pagina 1.
    stream: () => this.simpsonsService.getCharacters(1),
  });

  concatImagen(ruta: string) {
  let rutaCompleta = `https://cdn.thesimpsonsapi.com/500${ruta}`;
  return rutaCompleta.toString();
}
}

