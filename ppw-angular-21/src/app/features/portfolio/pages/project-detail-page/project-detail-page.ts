import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-detail-page.html',
})
export class ProjectDetailPage implements OnInit {
  private portfolio = inject(PortfolioService);
  private route = inject(ActivatedRoute);

  slug = signal<string>('');

  project = computed(() => this.portfolio.getProjectBySlug(this.slug()));
  developers = computed(() => {
    const p = this.project();
    if (!p) return [];
    return p.developerSlugs
      .map((s) => this.portfolio.getDeveloperBySlug(s))
      .filter((d): d is NonNullable<typeof d> => !!d);
  });

  async ngOnInit() {
    await this.portfolio.loadAll();
    this.route.paramMap.subscribe((p) => this.slug.set(p.get('slug') ?? ''));
  }
}
