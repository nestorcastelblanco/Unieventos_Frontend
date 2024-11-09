import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCuponDTO } from '../dto/CuponDTOs/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/CuponDTOs/editar-cupon-dto';
import { InformacionCuponDTO } from '../dto/CuponDTOs/informacion-cupon-dto';
import { CrearEventoDTO } from '../dto/EventoDTOs/CrearEventoDTO';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8080/api/admin";


 constructor(private http: HttpClient) { }

 // Método para crear un cupón
 public crearCupon(cuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cupon/crear`, cuponDTO);
  }

  // Método para editar un cupón
  public editarCupon(cuponDTO: EditarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/cupon/editar`, cuponDTO);
  }

  // Método para eliminar un cupón
  public eliminarCupon(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/cupon/eliminar/${id}`);
  }

  // Método para listar los tipos de cupon
  public listarTiposCupon(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/cupon/tipos`);
  }
  // Método para listar los estados de cupon
  public listarEstadosCupon(): Observable<MensajeDTO> {
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

  // Método para crear un evento
public crearEvento(eventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/evento/crear`, eventoDTO);
}

// Método para editar un evento
public editarEvento(eventoDTO: EditarCuponDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.authURL}/evento/editar`, eventoDTO);
}

// Método para eliminar un evento
public eliminarEvento(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.authURL}/evento/eliminar/${id}`);
}

// Método para listar los tipos de evento
public listarTiposEvento(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.authURL}/evento/tipos`);
}

// Método para listar eventos
public listarEventos(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.authURL}/evento/listar`);
}

// Método para obtener la información del evento por ID
public obtenerInformacionEvento(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.authURL}/evento/obtener-informacion/${id}`);
}

  
}

