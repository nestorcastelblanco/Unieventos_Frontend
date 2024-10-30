import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../././componentes/header/header.component";
import { FooterComponent } from "../../././componentes/footer/footer.component";
import { CarruselImagenesComponent } from "../../././componentes/carrusel-imagenes/carrusel-imagenes.component";

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HeaderComponent, FooterComponent, CarruselImagenesComponent],
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.css'
})
export class PrincipalPageComponent {

}
