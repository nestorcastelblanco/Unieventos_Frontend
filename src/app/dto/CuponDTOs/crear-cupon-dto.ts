import { EstadoCupon } from "./estado-cupon";
import { TipoCupon } from "./tipo-cupon";

export interface CrearCuponDTO {
    codigo : string,
    nombre : string,
    descuento : string,
    tipo : TipoCupon,
    estado : EstadoCupon,
    fechaVencimiento : Date
}
