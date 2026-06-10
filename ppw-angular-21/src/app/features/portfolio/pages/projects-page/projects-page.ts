import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { ProjectType } from '../../models/portfolio.models';

type Filter = ProjectType | 'todos';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.css'],
})
export class ProjectsPage implements OnInit {
  private portfolio = inject(PortfolioService);

  filter = signal<Filter>('todos');

  filters: { value: Filter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'academico', label: 'Académicos' },
    { value: 'personal', label: 'Personales' },
    { value: 'laboral', label: 'Laborales' },
    { value: 'simulado', label: 'Simulados' },
  ];

  filtered = computed(() => this.portfolio.filterProjectsByType(this.filter()));

  async ngOnInit() {
    await this.portfolio.loadAll();
  }
}
