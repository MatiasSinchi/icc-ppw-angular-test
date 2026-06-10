import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.css'],
})
export class ProjectCardComponent {
  project = input.required<Project>();
}
