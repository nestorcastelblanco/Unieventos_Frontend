import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dto/CuentaDTOs/LoginDTO';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCuentaDTO } from '../dto/CuentaDTOs/CrearCuentaDTO';
import { ActivarCuentaDTO } from '../dto/CuentaDTOs/ActivarCuentaDTO';
import { CambiarPasswordDTO } from '../dto/CuentaDTOs/CambiarPasswordDTO';
import { EnviarCodigoDTO } from '../dto/CuentaDTOs/EnviarCodigoDTO';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8080/api/publico";


 constructor(private http: HttpClient) { }

 public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
 }
 
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
 }

 public activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/activar-cuenta`, activarCuentaDTO);
}

public cambiarPassword(CambiarPasswordDTO: CambiarPasswordDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.authURL}/cambiar-password`, CambiarPasswordDTO);
}

public enviarCodigo(enviarCodigoDTO: EnviarCodigoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/enviar-codigo-recuperacion`, enviarCodigoDTO);
}
}

