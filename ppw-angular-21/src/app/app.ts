import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/header/app-header';
import { AppHeroComponent } from './components/hero/hero';
import { AppFooterComponent } from './components/app-footer/app-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, AppHeroComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ppw-angular-21');
  isLoggedIn = false;
}
