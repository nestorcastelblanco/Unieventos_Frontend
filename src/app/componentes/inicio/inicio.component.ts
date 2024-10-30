import { Component } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../././componentes/header/header.component";
import { FooterComponent } from "../../././componentes/footer/footer.component";
import { CarruselImagenesComponent } from "../../././componentes/carrusel-imagenes/carrusel-imagenes.component";
import { PrincipalPageComponent } from "../../././componentes/principal-page/principal-page.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HeaderComponent, FooterComponent, CarruselImagenesComponent,PrincipalPageComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'] // Cambié `styleUrl` a `styleUrls`
})
export class InicioComponent {
  public eventos: any[]; // Declaración de la variable `eventos`

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.publicoService.listarEventos(0).subscribe({
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