import { Localidades } from "./localidades"

export interface EditarEventoDTO {
    id:string,
    nombre:string,
    descripcion:string,
    direccion:string,
    ciudad:String,
    fecha:Date,
    tipo:string,
    imagenPortada:string,
    imagenLocalidades:string,
    estado:string,
    loclidades: Localidades[]
 }