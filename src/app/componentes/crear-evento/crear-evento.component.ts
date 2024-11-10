import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearEventoDTO } from '../../dto/EventoDTOs/CrearEventoDTO';
@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {

  crearEventoForm!: FormGroup;
  tiposDeEvento: string[];
  ciudades: string[];
  imagenPortada?: File;
  imagenLocalidades?: File;

  constructor(private formBuilder: FormBuilder, private publicoService: PublicoService , private adminService : AdministradorService) {
    this.crearFormulario();
    this.tiposDeEvento = [];
    this.ciudades = [];
    this.listarCiudades();
    this.listarTipos();

  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]]
    });
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      tipo == 'localidades' ? (this.imagenLocalidades = file) : (this.imagenPortada = file);
    }
   }
   

   public crearEvento(){


    const crearEventoDTO = this.crearEventoForm.value as CrearEventoDTO;
   
   
    this.adminService.crearEvento(crearEventoDTO).subscribe({
      next: data => {
        Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
      },
      error: error => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
   
   
   }
   

   public listarTipos(){
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tiposDeEvento = data.respuesta
      },
      error: (error) => {
        console.error(error);
      },
    });
   }
   
   public listarCiudades(){
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta
      },
      error: (error) => {
        console.error(error);
      },
    });
   }
   
   public subirImagen(tipo:string){
    const formData = new FormData();
    const imagen = tipo == 'portada' ? this.imagenPortada : this.imagenLocalidades;
    const formControl = tipo == 'portada' ? 'imagenPortada' : 'imagenLocalidades';
   
   
    formData.append('imagen', imagen!);
   
   
    this.adminService.subirImagen(formData).subscribe({
      next: (data) => {
        this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
        Swal.fire("Exito!", "Se ha subido la imagen.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
   
   
   }
   
}
