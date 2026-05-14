import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class AppHeroComponent {
  readonly title = signal('Componentes Standalone Reutilizables');
  readonly topics = signal(['signals', 'computed', '@if', '@for', '@switch']);
  
  readonly subtitle = computed(() => `Temas activos: ${this.topics().length}`);
  
  readonly viewMode = signal<'lista' | 'resumen'>('lista');

  toggleMode(): void {
    this.viewMode.update((m) => (m === 'lista' ? 'resumen' : 'lista'));
  }
}