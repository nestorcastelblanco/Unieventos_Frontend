import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // Importar RouterModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';  // Asegúrate de tener el servicio adecuado
// import { LocalidadDTO } from '../../dto/EventosDTOs/LocalidadDTO';  // Asegúrate de que la ruta esté correcta
import Swal from 'sweetalert2';
import { LocalidadDTO } from '../../dto/EventoDTOs/LocalidadDTO';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-crear-localidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-localidad.component.html',
  styleUrls: ['./crear-localidad.component.css']
})
export class CrearLocalidadComponent {

  crearLocalidadForm!: FormGroup;
  localidades: string[] = [];  // Lista de localidades
  imagenLocalidad?: File;

  constructor(
    private formBuilder: FormBuilder,
    private publicoService: PublicoService,
    private router: Router, 
    private adminService: AdministradorService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.crearLocalidadForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      capacidad: ['', [Validators.required, Validators.min(0)]]
    });
  }
  
}
