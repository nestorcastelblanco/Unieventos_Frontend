import { Component, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { VistaCarritoDTO } from '../../dto/CarritoDTOs/vista-carrito-dto';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { PublicoService } from '../../servicios/publico.service';
import { EventoEliminarCarritoDTO } from '../../dto/CarritoDTOs/evento-eliminar-carrito-dto';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  subtotal: number = 0;
  tickets: number = 0;
  descuento: number = 0;
  impuesto: number = 0;
  total: number = 0; // Total que se mostrará en la interfaz
  codigoCupon: string = '';
  cuponForm: FormGroup;
  cuponAplicado = false;
  cuponInvalido = false;

  vistaCarrito: VistaCarritoDTO = {
    id_carrito: '',
    fecha: '',
    detallesCarrito: []
  };

  detalles: any[] = []; // Array para almacenar los detalles de cada evento

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdministradorService,
    private clienteService: ClienteService,
    private publicService: PublicoService,
    private token: TokenService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef // Cambio importante para forzar la actualización
  ) {
    this.obtenerCarrito();
    this.cuponForm = this.fb.group({
      codigoCupon: ['', Validators.required],
    });
  }

  private cargarDatos() {
    this.detalles = []; // Limpiar el array antes de cargar nuevos datos
    this.vistaCarrito.detallesCarrito.forEach((detalle) => {
      this.publicService.obtenerEvento(detalle.idEvento).subscribe({
        next: (evento) => {
          this.detalles.push({
            ...detalle,            // Mantener los detalles actuales del evento
            evento,                // Añadir el evento obtenido
            idCarrito: this.vistaCarrito.id_carrito // Añadir el id_carrito al detalle
          });
  
          this.totalTickets();
          this.calcularSubtotal(); // Llamar a calcularSubtotal después de agregar un detalle
        },
        error: (error: any) => {
          console.error("Error al obtener el evento:", error);
        }
      });
    });
    console.log(this.detalles);
  }
  

  private obtenerCarrito() {
    const idCliente = this.token.getIDCuenta();
    this.clienteService.obtenerInformacionCarrito(idCliente).subscribe({
      next: (data) => {
        this.vistaCarrito = data.respuesta;
        this.cargarDatos(); // Llamar a cargarDatos después de obtener el carrito
      },
      error: (error: any) => {
        console.error("Error:", error);
      }
    });
  }

  eliminarItem(idDetalleCarrito: string, idCarrito: string) {

    console.log(idDetalleCarrito)
    console.log(idDetalleCarrito)
    const eventoEliminar : EventoEliminarCarritoDTO = {
      idDetalle: idDetalleCarrito,
      idCarrito: idCarrito
    };


    this.clienteService.eliminarItemCarrito(eventoEliminar).subscribe({
      next: (data) => {
        this.vistaCarrito = data.respuesta;
        Swal.fire("Evento Eliminado", data.respuesta, "success");
        location.reload();// Llamar a cargarDatos después de obtener el carrito
      },
      error: (error: any) => {
        console.error("Error:", error.respuesta);
        Swal.fire("Error al eliminar el evento", error.respuesta, "error");
      }
    });
  }

  pagar() {
    Swal.fire("Pago exitoso", "Tu compra se ha realizado con éxito.", "success");
  }

  calcularSubtotal() {
    this.subtotal = 0;
    const idCliente = this.token.getIDCuenta();
    this.clienteService.calcularTotalCarrito(idCliente).subscribe({
      next: (data) => {
        this.subtotal = data.respuesta;
        this.calcularImpuesto(); // Llamamos a calcularImpuesto después de obtener el subtotal
        this.calcularTotal(); // Calculamos el total inmediatamente
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        
        console.error("Error:", error);
      }
    });
  }

  totalTickets() {
    this.tickets = 0;
    this.vistaCarrito.detallesCarrito.forEach((detalle) => {
      this.tickets += detalle.cantidad;
    });
  }

  aplicarCupon() {
    const codigo = this.cuponForm.get('codigoCupon')?.value;
    this.adminService.obtenerCupon(codigo).subscribe({
      next: (data) => {
        if (data.respuesta) {
          // Calcular el descuento basado en el cupón
          this.descuento = parseFloat((this.subtotal * (data.respuesta.descuento / 100)).toFixed(2));
          this.cuponAplicado = true;
          this.calcularTotal(); // Recalcular el total después de aplicar el cupón
          Swal.fire("Cupón aplicado", data.respuesta, "success");
        } else {
          this.descuento = 0;
          this.cuponAplicado = false;
          Swal.fire("Cupón inválido", data.respuesta, "error");
        }
        this.cdr.detectChanges(); // Forzar actualización de la vista
      },
      error: (error: any) => {
        console.error("Error:", error);
        Swal.fire("Error", error.error.respuesta, "error");
      }
    });
  }

  calcularImpuesto() {
    // Calcular el impuesto solo después de que el subtotal esté disponible
    this.impuesto = parseFloat((this.subtotal * (14 / 100)).toFixed(2));
  }

  // Función para calcular el total: subtotal - descuento + impuesto
  calcularTotal() {
    this.total = this.subtotal - this.descuento + this.impuesto;
  }
}
