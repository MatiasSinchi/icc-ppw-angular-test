import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { SimpsonsService } from '../../service/simpons.service';
import { SimpsonsCacheService } from '../../service/simpsons-cache.service';

@Component({
  selector: 'app-simpson-detail-page',
  imports: [RouterLink],
  templateUrl: './simpson-detail-page.html',
  styleUrls: ['./simpson-detail-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpsonDetailPage {
  private route = inject(ActivatedRoute);
  private simpsonsService = inject(SimpsonsService);
  private cacheService = inject(SimpsonsCacheService);
    // Convertimos el parametro de ruta a numero.
  private characterId = Number(this.route.snapshot.paramMap.get('id'));
  
   // Resource reactivo: expone isLoading, error y value para el template.
  characterResource = rxResource({
    stream: () => {
      // Paso A: buscar primero en cache local.
      const cached = this.cacheService.getById(this.characterId);
      if (cached) {
        // Si existe en localStorage, devolvemos el dato al instante.
        return of(cached);
      }

      // Paso B: si no existe en cache, consultar API.
      return this.simpsonsService.getCharacterById(this.characterId).pipe(
        // Guardamos la respuesta para visitas futuras.
        tap((character) => this.cacheService.save(character))
      );
    },
  });

}
