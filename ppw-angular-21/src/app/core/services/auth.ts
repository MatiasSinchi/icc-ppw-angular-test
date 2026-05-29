import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { from } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // authState emite null cuando no hay sesion, o el objeto User cuando hay sesion.
  // toSignal convierte el Observable en un signal reactivo para usar en templates.
  currentUser = toSignal(authState(this.auth));

  // SOLO DEMO EN CLASE:
  // Rol por correo para pruebas rapidas de UI/guards.
  // No usar como mecanismo de seguridad real.
  role = computed<'admin' | 'user' | null>(() => {
    const u = this.currentUser();
    if (!u) return null;
    return u.email === 'admin@ups.edu.ec' ? 'admin' : 'user';
  });

  // signInWithEmailAndPassword devuelve una Promise.
  // from() la convierte en Observable para poder encadenar operadores RxJS o usar con rxResource.
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Igual que login, se convierte la Promise a Observable.
  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // Login con Google usando popup.
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout() {
    return from(signOut(this.auth));
  }

  // Acceso rapido al uid del usuario actual (null si no esta autenticado).
  get uid(): string | null {
    return this.currentUser()?.uid ?? null;
  }
}