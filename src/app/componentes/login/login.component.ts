import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  public login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/inicio']); // Redirige a la página de login
    }
  }

  public campoEsValido(campo: string): boolean {
    return this.loginForm.controls[campo].valid && this.loginForm.controls[campo].touched;
  }
  public abrirVentanaRecuperacion(){
    this.router.navigate(['/enviar-codigo']);
  }
}
