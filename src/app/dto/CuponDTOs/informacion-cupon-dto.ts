import { EstadoCupon } from "./estado-cupon";
import { TipoCupon } from "./tipo-cupon";

export interface InformacionCuponDTO {
    id : string,
    nombre : string,
    codigo : string,
    descuento : Number,
    fechaVencimiento : Date,
    tipo : TipoCupon,
    estado : EstadoCupon
}