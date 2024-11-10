import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { EventoService } from '../../servicios/evento.service'; // Importa el servicio
import Swal from 'sweetalert2';
import { InformacionEventoDTO } from '../../dto/EventoDTOs/informacion-evento-dto';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-vista-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vista-evento.component.html',
  styleUrl: './vista-evento.component.css'
})
export class VistaEventoComponent {
  eventos: InformacionEventoDTO[];
  selectedEventoId: string = "";

  cuponForm!: FormGroup;

  constructor(private eventoService: EventoService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.eventos = [];
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.authService.listarEventos().subscribe({
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
        this.authService.eliminarEvento(eventoId).subscribe({
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

   public abrirVentanaEditar(){
    if (this.selectedEventoId) {
      // Encuentra el evento basado en el ID seleccionado
      const evento = this.eventos.find(c => c.id === this.selectedEventoId);
      
      if (evento) {
        // Establece el evento seleccionado en el servicio
        this.eventoService.setEventoSeleccionado(evento);

        // Redirige al componente de edición
        this.router.navigate(['/editar-evento']);
      }
   }
  }
}
