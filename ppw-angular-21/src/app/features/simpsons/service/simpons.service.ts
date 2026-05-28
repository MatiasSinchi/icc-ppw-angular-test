import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, map, tap, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  SimpsonsCharacter,
  SimpsonsResponse,
  Options,
} from '../models/simpsons.interface';

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
        catchError((err) =>
          throwError(() => new Error('No se pudieron cargar los personajes'))
        )
      );
  }

    getCharacterById(id: number): Observable<SimpsonsCharacter> {
    return this.http
      .get<SimpsonsCharacter>(`${this.baseUrl}/characters/${id}`)
      .pipe(
        // delay permite simular latencia para ver mejor estados de carga en clase.
        delay(300),
        // timeout evita que la peticion quede colgada indefinidamente.
        timeout(5000),
        // tap para diagnostico sin alterar el dato.
        tap((character) => {
          console.log('Character loaded:', character['name']);
        }),
        // map opcional para normalizar campos antes de llegar al componente.
        map((character) => ({
          ...character,
          occupation: character['occupation'] || 'Sin ocupacion registrada',
        })),
        catchError(() =>
          throwError(() => new Error('No se pudo cargar el personaje'))
        )
      );
  } 
  getCharactersOptions(options: Options = {}): Observable<SimpsonsResponse> {
  const { page = 1, limit = 10 } = options;
  return this.http
    .get<SimpsonsResponse>(
      `${this.baseUrl}/characters?page=${page}&limit=${limit}`
    )
    .pipe(
      catchError(() =>
        throwError(() => new Error('No se pudieron cargar los personajes'))
      )
    );
}   
}
export type { SimpsonsCharacter };

