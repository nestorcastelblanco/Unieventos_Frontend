import { EstadoCuenta } from "../CuentaDTOs/estado-cuenta"
import { EstadoOrden } from "../OrdenDTOs/estado-orden"
import { EstadoEvento } from "./estado-evento"
import { LocalidadDTO } from "./LocalidadDTO"

export interface CrearEventoDTO {
    nombre:string,
    descripcion:string,
    direccion:string,
    ciudad:string,
    fecha:string,
    tipo:string,
    imagenPoster:string,
    imagenLocalidades:string,
    estado: EstadoEvento,
    localidades: LocalidadDTO[]
 }