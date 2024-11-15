import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../././componentes/header/header.component";
import { FooterComponent } from "../../././componentes/footer/footer.component";
import { CarruselImagenesComponent } from "../../././componentes/carrusel-imagenes/carrusel-imagenes.component";
import { PublicoService } from '../../servicios/publico.service';
import { EventoDTO } from '../../dto/EventoDTOs/evento-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.css'
})
export class PrincipalPageComponent {
  public eventos: EventoDTO[]; // Declaración de la variable `eventos`
  public eventosFiltrados: EventoDTO[] = []; // Lista de eventos filtrados
  public filtros = { nombre: '', tipo: '', ciudad: '' }; // Filtros de búsqueda

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Filtra los eventos según los valores de los filtros
  public filtrarEventos() {
    this.eventosFiltrados = this.eventos.filter(evento => {
      const nombreMatch = evento.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase());
      const tipoMatch = evento.tipo.toLowerCase().includes(this.filtros.tipo.toLowerCase());
      const ciudadMatch = evento.direccion.toLowerCase().includes(this.filtros.ciudad.toLowerCase());

      // Devuelve `true` si cumple con todos los filtros, `false` si no
      return nombreMatch && tipoMatch && ciudadMatch;
    });
  }
}
