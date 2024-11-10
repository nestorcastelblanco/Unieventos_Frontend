import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../././componentes/header/header.component";
import { FooterComponent } from "../../././componentes/footer/footer.component";
import { CarruselImagenesComponent } from "../../././componentes/carrusel-imagenes/carrusel-imagenes.component";
import { PublicoService } from '../../servicios/publico.service';
import { EventoDTO } from '../../dto/EventoDTOs/evento-dto';
import { Router } from '@angular/router';
import { InformacionEventoDTO } from '../../dto/EventoDTOs/informacion-evento-dto';
import { EventoService } from '../../servicios/evento.service'; // Importa el servicio
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-vista-evento-administrador',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './vista-evento-administrador.component.html',
  styleUrl: './vista-evento-administrador.component.css'
})
export class VistaEventoAdministradorComponent {

  eventos: EventoDTO[];
  selectedEventoId: string = "";

  cuponForm!: FormGroup;

  constructor(private eventoService: EventoService, 
    private adminService: AdministradorService, 
    private publicoService: PublicoService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService) { 
    this.eventos = [];
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
          this.eventos = data.respuesta; // Asigna la lista de tipos al array en el componente
      },
      error: (err) => {
          console.error('Error al cargar los eventos:', err);
      }
  });
  }

  public selectRow(eventoId: string) {
    this.selectedEventoId = eventoId; // Guarda el ID del cupón seleccionado
  }

  public eliminarEvento(eventoId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este evento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarEvento(eventoId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El evento ha sido eliminado.',
              'success'
            );
            // Actualiza la lista de cupones
            this.obtenerEventos();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar el evento.',
              'error'
            );
            console.error('Error al eliminar el evento:', err);
          }
        });
      }
    });
  }

  public abrirVentanaCrear(){
    this.router.navigate(['/crear-evento']);
   }

}
