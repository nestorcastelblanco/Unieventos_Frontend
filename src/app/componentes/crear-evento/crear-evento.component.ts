import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';

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

  constructor(private formBuilder: FormBuilder, private publicoService: PublicoService) {
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

  public onFileChange(event:any, tipo:string){
    if (event.target.files.length > 0) {
      const files = event.target.files;     
   
   
      switch(tipo){
        case 'localidades':
          this.crearEventoForm.get('imagenLocalidades')?.setValue(files[0]);
          break;
        case 'portada':
          this.crearEventoForm.get('imagenPortada')?.setValue(files[0]);
          break;
      }
   
   
    }
   }

   public crearEvento(){
    console.log(this.crearEventoForm.value);
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
   
}
