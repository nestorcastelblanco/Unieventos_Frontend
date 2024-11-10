import { Localidades } from "./localidades";

export interface EventoDTO {
   id:string,
   nombre:string,
   descripcion:string,
   fecha:Date,
   tipo:string,
   direccion:string,
   ciudad:string,
   localidades:Localidades[],
   imagenPortada:string,
   imagenLocalidades:string,
   estado:string
}
