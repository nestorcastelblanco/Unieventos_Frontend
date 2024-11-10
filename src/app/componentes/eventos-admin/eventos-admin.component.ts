import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../././componentes/header/header.component";
import { FooterComponent } from "../../././componentes/footer/footer.component";
import { CarruselImagenesComponent } from "../../././componentes/carrusel-imagenes/carrusel-imagenes.component";
import { PublicoService } from '../../servicios/publico.service';
import { EventoDTO } from '../../dto/EventoDTOs/evento-dto';

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HeaderComponent, FooterComponent, CarruselImagenesComponent],
  templateUrl: './eventos-admin.component.html',
  styleUrl: './eventos-admin.component.css'
})
export class EventosAdminComponent {

  public eventos: EventoDTO[]; // Declaración de la variable `eventos`

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

}
