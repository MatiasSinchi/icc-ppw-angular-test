import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { PortfolioService } from '../../features/portfolio/services/portfolio.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
})
export class AppHeader {
  private authService = inject(AuthService);
  private portfolio = inject(PortfolioService);
  private router = inject(Router);

  readonly brand = signal('SinchiLarriva.dev');

  currentUser = this.authService.currentUser;

  // Si el correo del usuario coincide con un programador del CMS, mostramos el panel de programador.
  isDeveloper = computed(() => {
    const u = this.currentUser();
    if (!u?.email) return false;
    return !!this.portfolio.getDeveloperByEmail(u.email);
  });

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
