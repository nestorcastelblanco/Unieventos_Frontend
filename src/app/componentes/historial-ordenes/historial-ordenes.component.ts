// historial-ordenes.component.ts
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { MensajeDTO } from '../../dto/TokenDTOs/MensajeDTO';
import { ItemOrdenDTO } from '../../dto/OrdenDTOs/item-orden-dto';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-historial-ordenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-ordenes.component.html',
  styleUrls: ['./historial-ordenes.component.css']
})
export class HistorialOrdenesComponent implements OnInit {
  historialOrdenes: ItemOrdenDTO[] = [];
  errorMensaje: string = '';

  constructor(private clienteService: ClienteService, private adminService: AdministradorService) {}

  ngOnInit(): void {
    this.cargarHistorialOrdenes();
  }

  cargarHistorialOrdenes(): void {
    this.clienteService.obtenerHistorialOrdenes().subscribe({
      next: (respuesta: MensajeDTO) => {
        if (!respuesta.error) {
          // Formateamos cada orden para manejar la fecha
          this.historialOrdenes = respuesta.respuesta.map((orden: ItemOrdenDTO) => ({
            ...orden,
            fecha: this.formatearFecha(orden.fecha)
          }));
        } else {
          this.errorMensaje = 'Error al cargar el historial de órdenes';
        }
      },
      error: (error) => {
        this.errorMensaje = 'No se pudo obtener el historial de órdenes. Inténtalo más tarde.';
        console.error('Error:', error);
      }
    });
  }

  // Método para formatear la fecha en un formato legible (DD/MM/YYYY HH:mm)
  formatearFecha(fecha: any): string {
    if (Array.isArray(fecha)) {
      const fechaObj = new Date(fecha[0], fecha[1] - 1, fecha[2], fecha[3], fecha[4]);
      const dia = fechaObj.getDate().toString().padStart(2, '0');
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaObj.getFullYear();
      const horas = fechaObj.getHours().toString().padStart(2, '0');
      const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
      return `${dia}/${mes}/${año} ${horas}:${minutos}`;
    }
    return '';
  }
}
