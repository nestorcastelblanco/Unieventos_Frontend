import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { Observable } from 'rxjs';
import { EditarEventoDTO } from '../dto/EventoDTOs/EditarEventoDTO';
import { CrearEventoDTO } from '../dto/EventoDTOs/CrearEventoDTO';
import { LocalidadDTO } from '../dto/EventoDTOs/LocalidadDTO';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {
 
 
  

 private adminURL = "https://unieventos.onrender.com/api/admin";
 private publicURL = "https://unieventos.onrender.com/api/publico"


 constructor(private http: HttpClient) { }

 public obtenerCupon(id: string): Observable<MensajeDTO> {
  console.log("Requesting coupon information for id:", id);
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtener-informacion/${id}`);
  }
  
  public obtenerHistorialOrdenes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/historial`);
  }
 public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/evento/crear`, crearEventoDTO);
 }
 
 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/evento/editar`, editarEventoDTO);
 }

 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
 }

 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/evento/eliminar/${id}`);
 }

 public listarEventosAdmin(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicURL}/evento/listar`);
 }

 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/imagen/subir`, imagen);
 }
}
