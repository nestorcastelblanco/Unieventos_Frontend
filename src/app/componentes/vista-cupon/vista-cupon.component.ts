import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CuponService } from '../../servicios/cupon.service'; // Importa el servicio
import Swal from 'sweetalert2';
import { InformacionCuponDTO } from '../../dto/CuponDTOs/informacion-cupon-dto';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-vista-cupon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vista-cupon.component.html',
  styleUrl: './vista-cupon.component.css'
})
export class VistaCuponComponent {
  cupones: InformacionCuponDTO[];
  selectedCuponId: string = "";

  cuponForm!: FormGroup;

  constructor(private cuponService: CuponService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.cupones = [];
    this.obtenerCupones();
  }

  public obtenerCupones() {
    this.authService.listarCupones().subscribe({
      next: (data) => {
          this.cupones = data.respuesta; // Asigna la lista de tipos al array en el componente
      },
      error: (err) => {
          console.error('Error al cargar los cupones:', err);
      }
  });
  }

  public selectRow(cuponId: string) {
    this.selectedCuponId = cuponId; // Guarda el ID del cupón seleccionado
  }

  public eliminarCupon(cuponId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este cupón!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminarCupon(cuponId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El cupón ha sido eliminado.',
              'success'
            );
            // Actualiza la lista de cupones
            this.obtenerCupones();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar el cupón.',
              'error'
            );
            console.error('Error al eliminar el cupón:', err);
          }
        });
      }
    });
  }

  public abrirVentanaCrear(){
    this.router.navigate(['/crear-cupon']);
   }

   public abrirVentanaEditar(){
    if (this.selectedCuponId) {
      // Encuentra el cupón basado en el ID seleccionado
      const cupon = this.cupones.find(c => c.id === this.selectedCuponId);
      
      if (cupon) {
        // Establece el cupon seleccionado en el servicio
        this.cuponService.setCuponSeleccionado(cupon);

        // Redirige al componente de edición
        this.router.navigate(['/editar-cupon']);
      }
   }
  }
}
