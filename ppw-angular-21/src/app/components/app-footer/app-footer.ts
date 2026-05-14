import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANTE para usar los pipes

@Component({
  selector: 'app/app-footer',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css'
})
export class AppFooterComponent {
  // Datos para demostrar los pipes
  companyName = 'mi empresa de software'; 
  authorRole = 'desarrollador frontend';
  currentDate = new Date();
  projectCost = 2500.50;
  techDetails = { framework: 'Angular', version: '17+', mode: 'Standalone' };
}