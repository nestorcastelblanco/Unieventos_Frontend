import { EstadoCupon } from "./estado-cupon";

export interface ItemCuponDTO {
    id : string,
    nombre : string,
    codigo : string,
    descuento : Number,
    fechaVencimiento : Date,
    estado : EstadoCupon
}
