import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-codigo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enviar-codigo.component.html',
  styleUrl: './enviar-codigo.component.css'
})
export class EnviarCodigoComponent {

  enviarForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.enviarForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  public enviarCodigo() {
    if (this.enviarForm.valid) {
      console.log(this.enviarForm.value);
      this.router.navigate(['/cambiar-password']); // Redirige a la página de Cambiar Contraseña
    }
  }


}
