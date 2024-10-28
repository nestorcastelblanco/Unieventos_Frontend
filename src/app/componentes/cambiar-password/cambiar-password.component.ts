import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      confirmaPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  public cambiarContrasenia() {

    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      this.router.navigate(['/login']); // Redirige a la página de login
    }
  }
}
