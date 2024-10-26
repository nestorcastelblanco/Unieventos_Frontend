import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {
  
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  public activarCuenta() {
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      this.router.navigate(['/login']); // Redirige a la página de login
    }
  }

}
