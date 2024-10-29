import { EstadoOrden } from "./estado-orden";

export interface ItemOrdenDTO {
    id : string,
    fecha : Date,
    total : Number,
    estado : EstadoOrden
}
