import { TipoEvento } from "./tipo-evento";

export interface ItemEventoDTO {
    id : string,
    nombre : string,
    fecha : Date,
    tipo : TipoEvento
}
