import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [UpperCasePipe, RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly brand = signal("ppw-angular");
  readonly showInfo = signal(false);
  readonly toggleLabel = computed(() => this.showInfo() ? "Ocultar info" : "Mostrar info");

  // El signal del servicio: null = no autenticado, User = autenticado.
  currentUser = this.authService.currentUser;

  changeBrand(): void {
    //actualizar el valor de la senal brand
    this.brand.update((valor)=> valor + '!');
  }

  resetBrand(): void {
    //actualizar el valor de la senal brand
    this.brand.set("ppw-angular");
  }

  toggleInfo(): void {
    this.showInfo.update((valor) => !valor);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      // Redirige al login despues de cerrar sesion.
      this.router.navigate(['/login']);
    });
  }
}
