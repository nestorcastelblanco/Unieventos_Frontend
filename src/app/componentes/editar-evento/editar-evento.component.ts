import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from '../../servicios/evento.service';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  public evento: any;
  public editarEventoForm!: FormGroup;
  imagenPortada?: File;
  imagenLocalidades?: File;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private publicService: PublicoService,
    private adminService: AdministradorService
  ) {}

  ngOnInit(): void {
    this.obtenerEvento();
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.editarEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      localidades: this.formBuilder.array([]) // Para manejar múltiples localidades
    });
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (tipo === 'evento') {
        this.imagenLocalidades = file;
      } else if (tipo === 'portada') {
        this.imagenPortada = file;
      }
    }
  }

  public subirImagen(tipo: string) {
    const formData = new FormData();
    const imagen = tipo === 'portada' ? this.imagenPortada : this.imagenLocalidades;
    const formControl = tipo === 'portada' ? 'imagenPortada' : 'imagenLocalidades';

    if (imagen) {
      formData.append('imagen', imagen);
      this.adminService.subirImagen(formData).subscribe({
        next: (data) => {
          this.editarEventoForm.get(formControl)?.setValue(data.respuesta);
          Swal.fire("Exito!", "Se ha subido la imagen.", "success");
        },
        error: (error) => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    }
  }

  private obtenerEvento(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.publicService.obtenerEvento(eventId).subscribe({
        next: (data) => {
          this.evento = data;
          this.editarEventoForm.patchValue(this.evento); 
          this.cargarLocalidades(this.evento.localidades);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el evento. Intente nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  private cargarLocalidades(localidades: any[]): void {
    const localidadesArray = this.editarEventoForm.get('localidades') as FormArray;
    localidades.forEach(localidad => {
      localidadesArray.push(this.formBuilder.group({
        nombreLocalidad: [localidad.nombreLocalidad, Validators.required],
        precio: [localidad.precio, Validators.required],
        capacidadMaxima: [localidad.capacidadMaxima, Validators.required],
        entradasVendidas: [localidad.entradasVendidas, Validators.required]
      }));
    });
  }

  navigateToCrearLocalidad() {
    this.router.navigate(['/crear-localidad']);
  }

  // public guardarCambios(): void {
  //   if (this.editarEventoForm.invalid) {
  //     return;
  //   }

  //   const eventoActualizado = this.editarEventoForm.value;

  //   this.adminService.actualizarEvento(this.evento.id, eventoActualizado).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         title: 'Evento Actualizado',
  //         text: 'El evento se ha actualizado correctamente.',
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         this.router.navigate(['/eventos']); // Redirige a la lista de eventos
  //       });
  //     },
  //     error: (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Hubo un problema al actualizar el evento. Intente nuevamente.',
  //         confirmButtonText: 'Reintentar'
  //       });
  //     }
  //   });
  // }

  // public eliminarEvento(): void {
  //   Swal.fire({
  //     title: '¿Estás seguro?',
  //     text: 'No podrás deshacer esta acción.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.eventoService.eliminarEvento(this.evento.id).subscribe({
  //         next: () => {
  //           Swal.fire({
  //             title: 'Eliminado',
  //             text: 'El evento ha sido eliminado con éxito.',
  //             icon: 'success',
  //             confirmButtonText: 'OK'
  //           }).then(() => {
  //             this.router.navigate(['/eventos']);
  //           });
  //         },
  //         error: (error) => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'Hubo un problema al eliminar el evento. Intente nuevamente.',
  //             confirmButtonText: 'Reintentar'
  //           });
  //         }
  //       });
  //     }
  //   });
  // }
}
