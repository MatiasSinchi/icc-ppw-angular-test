import { Component, inject, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ServiceCardComponent } from '../../components/service-card/service-card';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './services-page.html',
  styleUrls: ['./services-page.css'],
})
export class ServicesPage implements OnInit {
  private portfolio = inject(PortfolioService);
  services = this.portfolio.services;

  async ngOnInit() {
    await this.portfolio.loadAll();
  }
}
