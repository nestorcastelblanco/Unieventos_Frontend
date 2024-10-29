import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/CuentaDTOs/LoginDTO';
import { TokenService } from '../../servicios/token.service';


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
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  public login() {


    const loginDTO = this.loginForm.value as LoginDTO;
   
   
    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
        this.router.navigate(['/historial-eventos']);
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
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
