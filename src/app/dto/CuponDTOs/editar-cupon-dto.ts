import { EstadoCupon } from "./estado-cupon";
import { TipoCupon } from "./tipo-cupon";

export interface EditarCuponDTO {
    codigo : string,
    nombre : string,
    descuento : Number,
    tipo : TipoCupon,
    estado : EstadoCupon,
    fechaVencimiento : Date,
    id : string
}
