import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
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

  tiposCupon: string[] = ['UNICO', 'MULTIPLE'];  // Valores quemados
  estadosCupon: string[] = ['DISPONIBLE', 'NO_DISPONIBLE'];  // Valores quemados

  cuponForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
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
        this.router.navigate(['/vista-cupon']);
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
}
