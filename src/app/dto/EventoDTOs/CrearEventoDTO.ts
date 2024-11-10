import { Localidades } from "./localidades"

export interface CrearEventoDTO {
    nombre:string,
    descripcion:string,
    direccion:string,
    ciudad:String,
    fecha:Date,
    tipo:string,
    imagenPortada:string,
    imagenLocalidades:string,
    estado:string,
    localidades: Localidades[]
 }