import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Developer } from '../../models/portfolio.models';

@Component({
  selector: 'app-developer-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './developer-card.html',
  styleUrls: ['./developer-card.css'],
})
export class DeveloperCardComponent {
  developer = input.required<Developer>();
}
