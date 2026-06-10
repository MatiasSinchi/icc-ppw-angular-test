import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectCardComponent } from '../../components/project-card/project-card';

@Component({
  selector: 'app-developer-detail-page',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './developer-detail-page.html',
})
export class DeveloperDetailPage implements OnInit {
  private portfolio = inject(PortfolioService);
  private route = inject(ActivatedRoute);

  slug = signal<string>('');

  developer = computed(() => this.portfolio.getDeveloperBySlug(this.slug()));
  projects = computed(() => this.portfolio.getProjectsByDeveloper(this.slug()));

  async ngOnInit() {
    await this.portfolio.loadAll();
    this.route.paramMap.subscribe((p) => this.slug.set(p.get('slug') ?? ''));
  }
}
