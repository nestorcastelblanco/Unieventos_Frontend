import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleOrden, Orden } from '../../dto/OrdenDTOs/orden';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { OrdenPagoDTO } from '../../dto/OrdenDTOs/orden-pago';
import { MercadoPagoDTO } from '../../dto/TokenDTOs/MercadoPagoDTO';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  standalone: true,
})
export class OrdenComponent implements OnInit {
  url?: MercadoPagoDTO; // Asegura que sea opcional
  ordenes: Orden[] = [];
  loading: boolean = true;
  totalTickets: number = 0;
  subtotal: number = 0;
  descuento: number = 0;
  impuesto: number = 0;
  total: number = 0;

  cuponForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private token: TokenService
  ) {
    // Inicializar el formulario del cupón con validaciones
    this.cuponForm = this.fb.group({
      codigoCupon: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    // Llamada para obtener las órdenes
    this.obtenerOrdenesUsuario(this.token.getIDCuenta());
  }

  // Obtener órdenes del usuario
  obtenerOrdenesUsuario(idUsuario: string): void {
    this.loading = true; // Activa el indicador de carga
    this.clienteService.obtenerOrdenesUsuario(idUsuario).subscribe({
      next: (ordenes) => {
        this.ordenes = ordenes.respuesta;
        console.log('ORDENES CARGADAS: ', this.ordenes);
      },
      error: (error) => {
        console.error('Error al cargar órdenes: ', error);
      },
      complete: () => {
        this.loading = false; // Desactiva el indicador de carga
      },
    });
  }

  // Realizar pago de una orden
      idOrden: idOrden,
pagarOrden(idOrden: string): void {
  const ordenPagoData: OrdenPagoDTO = {
    idOrden: idOrden,
  };
  this.clienteService.realizarPago(ordenPagoData).subscribe({
    next: (data) => {
      this.url = data.respuesta;
      if (this.url) { // Verifica si la URL es válida
        window.location.href = this.url.url; // Asumiendo que `respuesta` es de tipo `MercadoPagoDTO`
        console.log('URL de pago:', this.url);
      } else {
        console.error('La URL de pago es inválida o no se obtuvo correctamente.');
      }
    },
    error: (error) => {
      console.error('Error al procesar el pago: ', error);
    },
  });
}

}
