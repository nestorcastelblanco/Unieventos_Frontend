import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importar RouterModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';  // Asegúrate de tener el servicio adecuado
// import { LocalidadDTO } from '../../dto/EventosDTOs/LocalidadDTO';  // Asegúrate de que la ruta esté correcta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-localidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-localidad.component.html',
  styleUrls: ['./crear-localidad.component.css']
})
export class CrearLocalidadComponent {

  crearLocalidadForm!: FormGroup;
  localidades: string[] = [];  // Lista de localidades
  imagenLocalidad?: File;

  constructor(private formBuilder: FormBuilder, private publicoService: PublicoService) {
    this.crearFormulario();
    // this.listarLocalidades();
  }

  private crearFormulario() {
    this.crearLocalidadForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      capacidad: ['', [Validators.required, Validators.min(0)]],
      localidad: ['', [Validators.required]],
    });
  }

  // Obtener localidades de la API
  // public listarLocalidades() {
  //   this.publicoService.listarLocalidades().subscribe({
  //     next: (data) => {
  //       this.localidades = data.respuesta;  // Suponiendo que el API devuelve las localidades en 'respuesta'
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  // // Método para enviar el formulario
  // public crearLocalidad() {
  //   if (this.crearLocalidadForm.valid) {
  //     const localidadDTO = this.crearLocalidadForm.value as LocalidadDTO;
  //     this.publicoService.crearLocalidad(localidadDTO).subscribe({
  //       next: () => {
  //         Swal.fire("Exito!", "Se ha creado la localidad.", "success");
  //       },
  //       error: (error) => {
  //         Swal.fire("Error!", error.error.respuesta, "error");
  //       }
  //     });
  //   }
  // }

  // // Subir imagen si se requiere
  // public onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.imagenLocalidad = event.target.files[0];
  //   }
  // }

  // // Método para subir imagen si es necesario
  // public subirImagen() {
  //   if (this.imagenLocalidad) {
  //     const formData = new FormData();
  //     formData.append('imagen', this.imagenLocalidad);
  //     this.publicoService.subirImagen(formData).subscribe({
  //       next: (data) => {
  //         this.crearLocalidadForm.get('imagen')?.setValue(data.respuesta);
  //         Swal.fire("Exito!", "Imagen subida correctamente.", "success");
  //       },
  //       error: (error) => {
  //         Swal.fire("Error!", error.error.respuesta, "error");
  //       }
  //     });
  //   }
  // }
}
