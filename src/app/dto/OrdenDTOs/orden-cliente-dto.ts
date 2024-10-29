import { DetalleOrden } from "./detalle-orden";
import { EstadoOrden } from "./estado-orden";
import { Pago } from "./pago";

export interface OrdenClienteDTO {
    idCliente : string,
    fecha : Date,
    codigoPasarela  : string,
    items : DetalleOrden[],
    pago : Pago,
    id : string,
    total : Number,
    idCupon : string,
    estado : EstadoOrden
}
