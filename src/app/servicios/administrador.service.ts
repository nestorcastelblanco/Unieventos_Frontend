import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { Observable } from 'rxjs';
import { EditarEventoDTO } from '../dto/EventoDTOs/EditarEventoDTO';
import { CrearEventoDTO } from '../dto/EventoDTOs/CrearEventoDTO';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8080/api/admin";
 private publicURL = "http://localhost:8080/api/publico"


 constructor(private http: HttpClient) { }


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
