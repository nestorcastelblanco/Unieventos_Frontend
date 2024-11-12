import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DetalleOrden, Orden } from '../../dto/OrdenDTOs/orden';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service'; 

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  standalone: true
})
export class OrdenComponent implements OnInit {

  ordenes: Orden[] = [];
  loading: boolean = true;
  totalTickets: number = 0; 
  subtotal: number = 0;
  descuento: number = 0;
  impuesto: number = 0;
  total: number = 0;

  cuponForm: FormGroup;

  constructor(private clienteService : ClienteService, private fb: FormBuilder, private token : TokenService) {
    // Inicializar el formulario del cupón
    this.cuponForm = this.fb.group({
      codigoCupon: ['']
    });
  }

  ngOnInit(): void {
    // Llamada para obtener las órdenes
    this.obtenerOrdenesUsuario(this.token.getIDCuenta());
  }

  // Obtener órdenes del usuario
  obtenerOrdenesUsuario(idUsuario: string): void {
    this.clienteService.obtenerOrdenesUsuario(idUsuario).subscribe(ordenes => {
      this.ordenes = ordenes.respuesta;
      console.log("ORDENES CARGADAS: ", this.ordenes)
      this.loading = false;
    });
  }

  pagarOrden(idOrden: string) { 
    this.clienteService.realizarPago(idOrden).subscribe(ordenes => {
      this.ordenes = ordenes.respuesta;
      console.log("ORDENES CARGADAS: ", this.ordenes)
      this.loading = false;
    });
  }

}
