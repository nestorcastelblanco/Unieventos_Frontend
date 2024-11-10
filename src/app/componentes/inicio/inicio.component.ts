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
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports: [PrincipalPageComponent, HeaderComponent, CarruselImagenesComponent]
})
export class InicioComponent {
  
}