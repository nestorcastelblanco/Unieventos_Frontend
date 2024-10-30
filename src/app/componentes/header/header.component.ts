import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// Importa si necesitas usar `CommonModule` para directivas como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';  
// Importa si estás utilizando formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';  
// Importa si necesitas utilizar servicios o inyectables 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Añadir módulos según sea necesario
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'UniEventos';
}
