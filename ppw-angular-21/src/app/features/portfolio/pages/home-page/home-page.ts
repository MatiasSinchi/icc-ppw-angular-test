import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { DeveloperCardComponent } from '../../components/developer-card/developer-card';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { ServiceCardComponent } from '../../components/service-card/service-card';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [
    RouterLink,
    DeveloperCardComponent,
    ProjectCardComponent,
    ServiceCardComponent,
  ],
  templateUrl: './home-page.html',
})
export class PortfolioHomePage implements OnInit {
  private portfolio = inject(PortfolioService);

  developers = this.portfolio.developers;
  services = this.portfolio.services;
  featured = this.portfolio.featuredProjects;
  source = this.portfolio.source;

  async ngOnInit() {
    await this.portfolio.loadAll();
  }
}
