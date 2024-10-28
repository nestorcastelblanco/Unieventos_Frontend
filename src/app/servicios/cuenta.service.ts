import { Injectable } from '@angular/core';
import { LoginDTO } from '../dto/CuentaDTOs/LoginDTO';


@Injectable({
 providedIn: 'root'
})
export class LoginService {


 eventos:LoginDTO [];


 constructor() {
   this.eventos = [];
 }
 
 public listar(){
   return this.eventos;
 }


}
