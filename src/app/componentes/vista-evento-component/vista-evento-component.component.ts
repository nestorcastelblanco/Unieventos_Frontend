import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { EventoCarritoDTO } from '../../dto/CarritoDTOs/evento-carrito-dto'
import { TokenService } from '../../servicios/token.service';
import { HeaderComponent } from "../header/header.component";
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-vista-evento-component',
  standalone: true,
  imports: [RouterModule,  FontAwesomeModule,ReactiveFormsModule, HeaderComponent],
  templateUrl: './vista-evento-component.component.html',
  styleUrls: ['./vista-evento-component.component.css'] // Cambia 'styleUrl' a 'styleUrls'
})
export class VistaEventoComponentComponent implements OnInit { // Implementa OnInit
  public evento: any
  agregarCarrito!: FormGroup;
  constructor( private router: Router, private formBuilder: FormBuilder, private publicService: PublicoService, private route: ActivatedRoute, private authService: ClienteService, private tokenService: TokenService) {}

  ngOnInit() { // Método de ciclo de vida
    this.obtenerEvento();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.agregarCarrito = this.formBuilder.group({
      localidad: ['', [Validators.required, Validators.nullValidator]],
      entradas : ['', [Validators.required, Validators.nullValidator]]
    });
  }

  public obtenerEvento() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.publicService.obtenerEvento(eventId).subscribe({
        next: (data) => {
          console.log("Datos recibidos:", data); // Verificar datos recibidos
          this.evento = data;
          console.log("Evento asignado:", this.evento); // Confirmar asignación a evento
        },
        error: (error) => {
          console.log("Error:", error);
          console.error(error);
        }
      });
    }
  }
  
  public agregarItem() {
    if (!this.evento) {
      console.error("Error: Los datos del evento no están disponibles.");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del evento. Intente nuevamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    const fechaEvento = new Date(this.evento.fecha); // Asegúrate que `this.evento.fecha` tenga la fecha correcta
    const fechaFormateada = fechaEvento.toISOString().slice(0, 19); // Esto producirá '2024-10-10T00:00:00'

    const enviarEvento: EventoCarritoDTO = {
      id: this.evento.id, // Asegúrate de que `this.evento` contiene `id` y no `idEvento`
      idUsuario: this.tokenService.getIDCuenta(),
      nombreEvento: this.evento.nombre ?? '',
      fechaEvento: fechaFormateada,
      nombreLocalidad: this.agregarCarrito.controls['localidad'].value,
      numBoletas: this.agregarCarrito.controls['entradas'].value,
    };
  
    console.log("Datos a enviar en EventoCarritoDTO:", JSON.stringify(enviarEvento, null, 2));
  
    this.authService.agregarItemCarrito(enviarEvento).subscribe({
      next: () => {
        Swal.fire({
            title: 'Entrada Añadida',
            text: 'La entrada ha sido añadida al carrito correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Refresca la página después de cerrar la alerta
            window.location.reload();
        });
    },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar',
          customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom'
          }
        });
      },
    });
  }
  
  
}
