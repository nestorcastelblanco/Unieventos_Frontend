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
  public eventos: EventoDTO[] = []; // Declaración de la variable `eventos`
  public eventosFiltrados: EventoDTO[] = []; // Lista de eventos filtrados
  public filtros = { nombre: '', tipo: '', ciudad: '' }; // Filtros de búsqueda

  constructor(private publicoService: PublicoService) {
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.eventos = data.respuesta;
        this.eventosFiltrados = [...this.eventos]; // Inicializa los eventos filtrados con todos los eventos
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Filtra los eventos según los valores de los filtros
  // Filtra los eventos según los valores de los filtros
  public filtrarEventos() {
  // Verifica si todos los filtros están vacíos
  if (!this.filtros.nombre && !this.filtros.tipo && !this.filtros.ciudad) {
    this.obtenerEventos()
  }

  // Filtra los eventos que cumplan con al menos uno de los criterios
  this.eventos = this.eventos.filter(evento => {
    const nombreMatch = this.filtros.nombre ? evento.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()) : false;
    const tipoMatch = this.filtros.tipo ? evento.tipo.toLowerCase().includes(this.filtros.tipo.toLowerCase()) : false;
    const ciudadMatch = this.filtros.ciudad ? evento.direccion.toLowerCase().includes(this.filtros.ciudad.toLowerCase()) : false;

    // Devuelve `true` si cumple con al menos uno de los filtros
    return nombreMatch || tipoMatch || ciudadMatch;
  });

  console.log("eventos filtrados: ", this.eventos)
}
  // Limpia los filtros y muestra todos los eventos nuevamente
  public limpiarFiltros() {
    this.filtros = { nombre: '', tipo: '', ciudad: '' }; // Restablece los filtros
    this.eventosFiltrados = [...this.eventos]; // Restaura todos los eventos
  }
}
