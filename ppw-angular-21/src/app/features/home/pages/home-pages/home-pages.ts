import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppHeroComponent } from "../../../../components/hero/hero";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-pages',
  imports: [AppHeroComponent],
  templateUrl: './home-pages.html',
  styleUrl: './home-pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePages {
  constructor(private router: Router) {}
  goToStudentsPage() {
    this.router.navigate(['/students']);
  }
}
