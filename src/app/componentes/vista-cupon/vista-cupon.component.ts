import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CuponService } from '../../servicios/cupon.service'; 
import Swal from 'sweetalert2';
import { InformacionCuponDTO } from '../../dto/CuponDTOs/informacion-cupon-dto';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-vista-cupon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vista-cupon.component.html',
  styleUrls: ['./vista-cupon.component.css']
})
export class VistaCuponComponent implements OnInit {
  cupones: InformacionCuponDTO[] = []; 
  selectedCuponId: string = ""; 

  cuponForm!: FormGroup; 

  constructor(
    private cuponService: CuponService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void { 
    this.obtenerCupones(); 
  }

  public obtenerCupones() {
    this.authService.listarCupones().subscribe({
      next: (data) => {
        this.cupones = data.respuesta; 
      },
      error: (err) => {
        console.error('Error al cargar los cupones:', err);
      }
    });
  }

  public selectRow(cuponId: string) {
    this.selectedCuponId = cuponId;
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

  public abrirVentanaCrear() {
    this.router.navigate(['/crear-cupon']);
  }

  public abrirVentanaEditar() {
    if (this.selectedCuponId) {
      const cupon = this.cupones.find(c => c.id === this.selectedCuponId);
      if (cupon) {
        this.cuponService.setCuponSeleccionado(cupon);
        this.router.navigate(['/editar-cupon']);
      }
    }
  }

  // trackBy function para optimizar el rendimiento de *ngFor
  trackById(index: number, cupon: InformacionCuponDTO): string {
    return cupon.id; // Devuelve el ID del cupón para hacer el seguimiento por ID
  }
}
