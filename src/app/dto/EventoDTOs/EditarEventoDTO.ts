import { LocalidadDTO } from "./LocalidadDTO"

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
    loclidades: LocalidadDTO[]
 }