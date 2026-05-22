import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface SimpsonsResponse {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SimpsonsService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://thesimpsonsapi.com/api';

 // Devuelve un Observable tipado; no hace la llamada hasta que alguien se suscribe.
  getCharacters(page: number = 1): Observable<SimpsonsResponse> {
    return this.http
      // <SimpsonsResponse> le dice a TypeScript que esperamos ese shape de datos.
      // Es tipado estatico (compile-time), no transforma el JSON en runtime.
      .get<SimpsonsResponse>(`${this.baseUrl}/characters?page=${page}`)
      .pipe(
        // tap permite inspeccionar/loggear la respuesta sin modificarla.
        tap((response) => {
          console.log('Simpsons API response:', response);
        }),
        // Si la peticion falla, convertimos el error en uno mas legible para la UI.
        catchError(err =>
          throwError(() => new Error('No se pudieron cargar los personajes'))
        )
      );
  }
}