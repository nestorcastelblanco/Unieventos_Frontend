import { Items } from "./items";

export interface CrearOrdenDTO {
    idCliente : string,
    codigoPasarela : string,
    items : Items[],
    total : Number,
    codigoCupon : string
}
