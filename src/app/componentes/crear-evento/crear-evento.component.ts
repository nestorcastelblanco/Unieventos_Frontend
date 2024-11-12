import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearEventoDTO } from '../../dto/EventoDTOs/CrearEventoDTO';
import { LocalidadDTO } from '../../dto/EventoDTOs/LocalidadDTO';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  crearLocalidadForm!: FormGroup;
  crearEventoForm!: FormGroup;
  localidadesDisponibles: LocalidadDTO[] = []; // Lista de localidades creadas
  localidadesSeleccionadas: LocalidadDTO[] = []; // Lista de localidades para el evento
  imagenPortada?: File;
  imagenLocalidades?: File;

  estados: string[] = ['ACTIVO', 'INACTIVO'];
  tipos: string[] = ['CONCIERTO', 'CULTURAL', 'DEPORTE', 'MODA', 'BELLEZA'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdministradorService
  ) {
    this.crearFormulario();
  }

  navigateToCrearLocalidad() {
    this.router.navigate(['/crear-localidad']);
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      imagenPoster: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]],
      localidad: ['', Validators.required]
    });

    this.crearLocalidadForm = this.formBuilder.group({
      nombreLocalidad: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(1)]],
      capacidadMaxima: ['', [Validators.required, Validators.min(1)]]
    });
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (tipo === 'portada') {
        this.imagenPortada = file;
      } else if (tipo === 'evento') {
        this.imagenLocalidades = file;
      }
    }
  }  

  public crearLocalidad() {
    if (this.crearLocalidadForm.valid) {
      const nuevaLocalidad = this.crearLocalidadForm.value as LocalidadDTO;
      this.localidadesDisponibles.push(nuevaLocalidad);
      Swal.fire("Éxito", "Localidad creada y añadida a la lista.", "success");
      this.crearLocalidadForm.reset();
    } else {
      Swal.fire("Error", "Complete todos los campos de la localidad.", "error");
    }
  }

  public agregarLocalidadAlEvento() {
    const nombreLocalidadSeleccionada = this.crearEventoForm.get('localidad')?.value;
    if (nombreLocalidadSeleccionada) {
      // Buscar la localidad completa en `localidadesDisponibles`
      const localidadSeleccionada = this.localidadesDisponibles.find(
        localidad => localidad.nombreLocalidad === nombreLocalidadSeleccionada
      );
  
      if (localidadSeleccionada) {
        // Verificar que no exista una localidad repetida en `localidadesSeleccionadas`
        const localidadYaSeleccionada = this.localidadesSeleccionadas.some(
          localidad => localidad.nombreLocalidad === localidadSeleccionada.nombreLocalidad
        );
  
        if (!localidadYaSeleccionada) {
          this.localidadesSeleccionadas.push(localidadSeleccionada);
          console.log(this.localidadesDisponibles);
          Swal.fire("Éxito", "Localidad añadida al evento.", "success");
        } else {
          console.log(this.localidadesDisponibles);

          Swal.fire("Aviso", "La localidad ya está añadida al evento.", "info");
        }
      } else {
        console.log(this.localidadesDisponibles);

        Swal.fire("Error", "No se encontró la localidad seleccionada.", "error");
      }
    } else {
      Swal.fire("Error", "Seleccione una localidad válida.", "error");
    }
  }
  

  public crearEvento() {
    const fechaFormateada = this.crearEventoForm.get('fecha')?.value;
    const fechaCorrecta = new Date(fechaFormateada).toISOString().slice(0, 19); // Esto elimina el sufijo "Z" y ajusta el formato a "YYYY-MM-DDTHH:mm:ss"


    const crearEventoDTO : CrearEventoDTO = {
      nombre: this.crearEventoForm.controls['nombre'].value,
      descripcion:  this.crearEventoForm.controls['descripcion'].value,
      direccion:  this.crearEventoForm.controls['direccion'].value,
      ciudad:  this.crearEventoForm.controls['ciudad'].value,
      tipo:  this.crearEventoForm.controls['tipo'].value,
      imagenPoster:  this.crearEventoForm.controls['imagenPoster'].value, // Asegúrate de que este campo exista en el formulario
      imagenLocalidades:  this.crearEventoForm.controls['imagenLocalidades'].value, // Este también debe estar presente
      estado:  this.crearEventoForm.controls['estado'].value,
      localidades:  this.localidadesSeleccionadas,
      fecha: fechaCorrecta,
    };

    console.log(crearEventoDTO)
    this.adminService.crearEvento(crearEventoDTO).subscribe({
      next: () => {
        Swal.fire("Éxito!", "Se ha creado un nuevo evento.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }

  public subirImagen(tipo: string) {
    const formData = new FormData();
    const imagen = tipo === 'portada' ? this.imagenPortada : this.imagenLocalidades;
    const formControl = tipo === 'portada' ? 'imagenPoster' : 'imagenLocalidades';
  
    if (imagen) {
      formData.append('imagen', imagen);
      this.adminService.subirImagen(formData).subscribe({
        next: (data) => {
          this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
          Swal.fire("Éxito!", "Imagen subida correctamente.", "success");
        },
        error: (error) => {
          Swal.fire("Error!", "No se pudo subir la imagen.", "error");
        }
      });
    }
  }
  
  
}
