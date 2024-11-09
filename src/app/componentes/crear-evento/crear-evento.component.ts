import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { CrearEventoDTO } from '../../dto/EventoDTOs/CrearEventoDTO';
import { Localidades } from "../../dto/EventoDTOs/localidades";

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  tiposEvento: string[] = [];
  localidades: Localidades[] = [];

  eventoForm!: FormGroup;
  localidadForm!: FormGroup;

  @ViewChild('agregarLocalidadModal') agregarLocalidadModal!: ElementRef; // Referencia al modal

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.listarTipos();
    this.crearFormulario();
    this.crearFormularioLocalidad();
  }

  private crearFormulario() {
    this.eventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagenPoster: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]],
      localidades: ['', [Validators.required]]
    });
  }

  private crearFormularioLocalidad() {
    this.localidadForm = this.formBuilder.group({
      nombreLocalidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      capacidadMaxima: ['', [Validators.required]],
      entradasVendidas: ['', [Validators.required]]
    });
  }

  public agregarLocalidad() {
    if (this.localidadForm.valid) {
      const nuevaLocalidad = this.localidadForm.value as Localidades;
      this.localidades.push(nuevaLocalidad);

      // Resetea el formulario de localidad
      this.localidadForm.reset();

      // Cierra el modal después de agregar la localidad
      const modal: any = this.agregarLocalidadModal.nativeElement;
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
      modal.style.display = 'none';

      Swal.fire({
        title: 'Localidad agregada',
        text: 'La localidad ha sido agregada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Completa todos los campos de la localidad',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  public crearEvento() {
    const nuevoEvento = this.eventoForm.value as CrearEventoDTO;
    nuevoEvento.localidades = this.localidades;

    this.authService.crearEvento(nuevoEvento).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Evento creado',
          text: 'El Evento se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/vista-evento']); // Redirige a la página deseada
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  public listarTipos() {
    this.authService.listarTiposEvento().subscribe({
      next: (data) => {
        this.tiposEvento = data.respuesta; // Asigna la lista de tipos al array en el componente
      },
      error: (err) => {
        console.error('Error al cargar los tipos de evento:', err);
      }
    });
  }
}
