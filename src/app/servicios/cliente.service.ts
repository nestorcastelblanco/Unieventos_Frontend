import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearOrdenDTO } from '../dto/OrdenDTOs/crear-orden-dto';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { Observable } from 'rxjs';
import { EditarEventoDTO } from '../dto/EventoDTOs/EditarEventoDTO';
import { CrearEventoDTO } from '../dto/EventoDTOs/CrearEventoDTO';
import { EventoCarritoDTO } from '../dto/CarritoDTOs/evento-carrito-dto';
import { EventoEliminarCarritoDTO } from '../dto/CarritoDTOs/evento-eliminar-carrito-dto';
import { ActualizarItemCarritoDTO } from '../dto/CarritoDTOs/actualizar-item-carrito-dto';
import { OrdenPagoDTO } from '../dto/OrdenDTOs/orden-pago';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "https://unieventos.onrender.com/api/cliente";

  constructor(private http: HttpClient) { }

  
  public crearOrden(crearOrden: CrearOrdenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/orden/crear`, crearOrden);
  } 

  public cancelarOrden(cancelarOrden: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/orden/cancelar`, cancelarOrden);
  } 

  public obtenerOrdenesUsuario(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/orden/usuario/${id}`);
  }  


  public obtenerCupon(id: string): Observable<MensajeDTO> {
    console.log("Requesting coupon information for id:", id);
    return this.http.get<MensajeDTO>(`${this.clienteURL}/cupon/obtener-informacion/${id}`);
}


  public obtenerHistorialOrdenes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/orden/historial`);
  }

  public obtenerDetallesOrden(idOrden : string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/orden/detalles/{idOrden}`);
  }

  public realizarPago(idOrden: OrdenPagoDTO): Observable<MensajeDTO> {
    console.log("id de la orden: ", idOrden.idOrden)
    return this.http.post<MensajeDTO>(`${this.clienteURL}/orden/realizar-pago`, idOrden);
  }
    
  public agregarItemCarrito(eventoCarrito : EventoCarritoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/carrito/agregar-item`,eventoCarrito);
  }

  public eliminarItemCarrito(eventoEliminarCarrito: EventoEliminarCarritoDTO): Observable<MensajeDTO> {
    const { idDetalle, idCarrito } = eventoEliminarCarrito;
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/carrito/eliminar-item/${idDetalle}/${idCarrito}`);
  }

  public eliminarCarrito(idCarrito : string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/carrito/eliminar-carrito/${idCarrito}`);
  }

  public obtenerInformacionCarrito(idCarrito : string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/carrito/obtener-informacion/${idCarrito}`);
  }
 
  public listarCarritos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/carrito/listar`);
  }

  public actualizarItemCarrito(actualizarItemCarritoDTO : ActualizarItemCarritoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/carrito/actualizar-item`, actualizarItemCarritoDTO );
  }

  public calcularTotalCarrito(idUsuario : string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/carrito/calcular-total/${idUsuario}`);
  }

  public vaciarCarrito(idCarrito : string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/carrito/vaciar-carrito/${idCarrito}`);
  }

}