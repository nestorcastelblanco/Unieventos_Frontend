import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { CuentaService } from '../../servicios/cuenta.service';
import Swal from 'sweetalert2';
import { EditarCuentaDTO } from '../../dto/CuentaDTOs/editar-cuenta-dto';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  editarForm!: FormGroup;
  isLogged = false;
  id: string = "";
  email: string = "";
  nombre: string = "";
  telefono: string = "";
  direccion: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private cuentaService: CuentaService, private tokenService: TokenService) { 
    this.isLogged = this.tokenService.isLogged();
     if (this.isLogged) {
     this.id = this.tokenService.getIDCuenta();
     this.nombre = this.tokenService.getNombre();
     this.telefono = this.tokenService.getTelefono();
     this.direccion = this.tokenService.getDireccion();

   }
    this.crearFormulario();
  }

  private crearFormulario() {
    this.editarForm = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      nombre: [this.nombre, [Validators.required, Validators.maxLength(20)]],
      telefono: [this.telefono, [Validators.required,Validators.maxLength(10), Validators.minLength(10)]],
      direccion: [this.direccion, [Validators.required]],
    });
  }

  public editarPerfil() {
    const nuevoPerfil = this.editarForm.value as EditarCuentaDTO;

    this.cuentaService.editarCuenta(nuevoPerfil).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Perfil editado',
          text: 'El perfil se ha editado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/pagina-redireccion']); // Redirige a la página deseada
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
