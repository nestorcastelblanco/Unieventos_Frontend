import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { LoginDTO } from '../dto/CuentaDTOs/LoginDTO';
import { CrearCuentaDTO } from '../dto/CuentaDTOs/CrearCuentaDTO';
import { ActivarCuentaDTO } from '../dto/CuentaDTOs/ActivarCuentaDTO';
import { CambiarPasswordDTO } from '../dto/CuentaDTOs/CambiarPasswordDTO';
import { EnviarCodigoDTO } from '../dto/CuentaDTOs/EnviarCodigoDTO';
import { TokenDTO } from '../dto/TokenDTOs/token-dto';



@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "http://localhost:8080/api/publico";


 constructor(private http: HttpClient) { }


 public listarTipos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-tipos`);
 }


 public listarCiudades(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-ciudades`);
 }


 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/listar`);
 }


 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/informacion/${id}`);
 }

 public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.publicoURL}/crear-cuenta`, cuentaDTO);
 }
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.publicoURL}/iniciar-sesion`, loginDTO);
 }

 public activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/activar-cuenta`, activarCuentaDTO);
}

public cambiarPassword(CambiarPasswordDTO: CambiarPasswordDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.publicoURL}/cambiar-password`, CambiarPasswordDTO);
}

public enviarCodigo(enviarCodigoDTO: EnviarCodigoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/enviar-codigo-recuperacion`, enviarCodigoDTO);
}

public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/refresh`, tokenDTO);
   }

}

