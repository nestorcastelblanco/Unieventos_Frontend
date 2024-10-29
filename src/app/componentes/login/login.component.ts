import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/CuentaDTOs/LoginDTO';
import { TokenService } from '../../servicios/token.service';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private tokenService: TokenService) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  public login() {
    const loginDTO = this.loginForm.value as LoginDTO;
    console.log(loginDTO);
    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Inicio de Sesion Correcto',
          text: 'Las credenciales son validas',
          icon: 'success',
          confirmButtonText: "Ingresar",
          customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom'
          }
        });
        this.tokenService.login(data.respuesta.token);
        this.router.navigate(['/Inicio']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar',
          customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom'
          }
        });
      },
    });
  }
  
   

  public campoEsValido(campo: string): boolean {
    return this.loginForm.controls[campo].valid && this.loginForm.controls[campo].touched;
  }
  public abrirVentanaRecuperacion(){
    this.router.navigate(['/enviar-codigo']);
  }

  public abrirVentanaRegistro(){
    this.router.navigate(['/registro']);
  }
}
