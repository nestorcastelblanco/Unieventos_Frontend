import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { HttpClient } from '@angular/common/http'
import { ClienteService } from './cliente.service';


const TOKEN_KEY = "AuthToken";


@Injectable({
 providedIn: 'root'
})
export class TokenService {

 constructor(private router: Router, private clienteService : ClienteService) { }

 public setToken(token: string) {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}


public isLogged(): boolean {
  if (this.getToken()) {
    return true;
  }
  return false;
}

public login(token: string) {
  this.setToken(token);
  const rol = this.getRol();
  let destino = rol == "ADMINISTRADOR" ? "/panel-admin" : "/";
  this.router.navigate([destino]).then(() => {
    window.location.reload();
  });
 }
 

public logout() {
  window.sessionStorage.clear();
  this.router.navigate(["/login"]).then(() => {
    window.location.reload();
  });
 }
 

private decodePayload(token: string): any {
  const payload = token!.split(".")[1];
  const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
  const values = JSON.parse(payloadDecoded);
  return values;
}

public getIDCuenta(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.id;
  }
  return "";
 }
 
 
 public getRol(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.rol;
  }
  return "";
 }
 

 public getCorreo(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.sub;
  }
  return "";
 }

 public getNombre(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    return values.nombre;
  }
  return "";
}

public getTelefono(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    console.log(values.telefono);
    return values.telefono;
  }
  return "";
}

public getDireccion(): string {
  const token = this.getToken();
  if (token) {
    const values = this.decodePayload(token);
    console.log(values.direccion);
    return values.direccion; 
  }
  return "";
}

}
