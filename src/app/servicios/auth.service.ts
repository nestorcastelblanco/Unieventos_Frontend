import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dto/CuentaDTOs/LoginDTO';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCuentaDTO } from '../dto/CuentaDTOs/CrearCuentaDTO';
import { ActivarCuentaDTO } from '../dto/CuentaDTOs/ActivarCuentaDTO';


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
 
}

