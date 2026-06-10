import { Component, inject, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { DeveloperCardComponent } from '../../components/developer-card/developer-card';

@Component({
  selector: 'app-developers-page',
  standalone: true,
  imports: [DeveloperCardComponent],
  templateUrl: './developers-page.html',
  styleUrls: ['./developers-page.css'],
})
export class DevelopersPage implements OnInit {
  private portfolio = inject(PortfolioService);
  developers = this.portfolio.developers;

  async ngOnInit() {
    await this.portfolio.loadAll();
  }
}
