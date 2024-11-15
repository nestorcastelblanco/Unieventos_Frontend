import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCuponDTO } from '../dto/CuponDTOs/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/CuponDTOs/editar-cupon-dto';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "https://unieventos.onrender.com/api/admin";


 constructor(private http: HttpClient) { }

 // Método para crear un cupón
 public crearCupon(cuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cupon/crear`, cuponDTO);
  }

  public listarEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar-eventos`);
  }
  // Método para editar un cupón
  public editarCupon(cuponDTO: EditarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/cupon/editar`, cuponDTO);
  }

  // Método para eliminar un cupón
  public eliminarCupon(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/cupon/eliminar/${id}`);
  }

  obtenerTiposCupon(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/cupon/tipos`);
  }

  obtenerEstadosCupon(): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(`${this.authURL}/cupon/estados`);
  }

  // Método para editar un cupón
  public listarCupones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/cupon/listar`);
  }

  // Método para obtener la información del cupón por ID
  public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/cupon/obtener-informacion/${id}`);
  }
  
}

