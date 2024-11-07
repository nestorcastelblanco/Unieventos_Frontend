import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { CrearCuponDTO } from '../../dto/CuponDTOs/crear-cupon-dto';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-cupon.component.html',
  styleUrl: './crear-cupon.component.css'
})
export class CrearCuponComponent {

  tiposCupon: string[] = [];
  estadosCupon: string[] = [];

  cuponForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.listarTipos();
    this.listarEstados();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.cuponForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descuento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]]
    });
  }

  public crearCupon() {
    const nuevoCupon = this.cuponForm.value as CrearCuponDTO;

    this.authService.crearCupon(nuevoCupon).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cupón creado',
          text: 'El cupón se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/vista-cupon']); // Redirige a la página deseada
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
    this.authService.listarTiposCupon().subscribe({
      next: (data) => {
          this.tiposCupon = data.respuesta; // Asigna la lista de tipos al array en el componente
      },
      error: (err) => {
          console.error('Error al cargar los tipos de cupon:', err);
      }
  });
  }

  public listarEstados() {
    this.authService.listarEstadosCupon().subscribe({
      next: (data) => {
          this.estadosCupon = data.respuesta; // Asigna la lista de tipos al array en el componente
      },
      error: (err) => {
          console.error('Error al cargar los estados de cupon:', err);
      }
  });
  }


}
