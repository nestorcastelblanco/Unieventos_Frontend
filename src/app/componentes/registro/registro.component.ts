import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Cambiado styleUrl a styleUrls
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required]] // Agrega el campo para confirmar contraseña
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  public registrar() {
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      this.router.navigate(['/activar-cuenta']); // Redirige a la página de login
    }
  }
}