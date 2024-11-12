import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CuponService } from '../../servicios/cupon.service'; // Importa el servicio
import Swal from 'sweetalert2';
import { EditarCuponDTO } from '../../dto/CuponDTOs/editar-cupon-dto';
import { InformacionCuponDTO } from '../../dto/CuponDTOs/informacion-cupon-dto';

@Component({
  selector: 'app-editar-cupon',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-cupon.component.html',
  styleUrl: './editar-cupon.component.css'
})
export class EditarCuponComponent {
  tiposCupon: string[] = ['UNICO', 'MULTIPLE'];  // Valores quemados
  estadosCupon: string[] = ['DISPONIBLE', 'NO_DISPONIBLE'];  // Valores quemados
  codigo: string = "";
  nombre: string = "";
  descuento: string = "";
  tipo: string = "";
  estado: string = "";
  id: string = "";

  cuponForm!: FormGroup;

  constructor(private cuponService: CuponService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.cuponService.getCuponSeleccionado().subscribe(cupon => {
      if (cupon) {
        this.crearFormulario(cupon);
      }
    });
  }

  private crearFormulario(cupon: InformacionCuponDTO) {
    this.cuponForm = this.formBuilder.group({
      id: [cupon.id, [Validators.required]],
      codigo: [cupon.codigo, [Validators.required, Validators.minLength(6)]],
      nombre: [cupon.nombre, [Validators.required, Validators.maxLength(20)]],
      descuento: [cupon.descuento, [Validators.required]],
      tipo: [cupon.tipo, [Validators.required]],
      estado: [cupon.estado, [Validators.required]],
      fechaVencimiento: [cupon.fechaVencimiento, [Validators.required]],
    });
  }

  public editarCupon() {
    const nuevoCupon = this.cuponForm.value as EditarCuponDTO;

    this.authService.editarCupon(nuevoCupon).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cupón editado',
          text: 'El cupón se ha editado correctamente',
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

}
