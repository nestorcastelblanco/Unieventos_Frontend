import { DetalleOrden } from "./detalle-orden";
import { EstadoOrden } from "./estado-orden";
import { Pago } from "./pago";

export interface InformacionOrdenCompraDTO {
    idCliente : string,
    fecha : Date,
    codigoPasarela  : string,
    items : DetalleOrden[],
    pago : Pago,
    ordenId : string,
    total : string,
    codigoCupon : string,
    estado : EstadoOrden
}
