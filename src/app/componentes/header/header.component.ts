import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Unieventos';
  isLogged = false;
  email: string = "";
  rol: string = "";
  currentRoute: string = ""; // Nueva variable para la ruta actual

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getCorreo();
      this.rol = this.tokenService.getRol();
    }

    // Suscribirse a los eventos de navegación para actualizar `currentRoute`
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Captura la URL actual cuando cambia la navegación
      }
    });
  }

  public logout() {
    this.tokenService.logout();
  }
}
