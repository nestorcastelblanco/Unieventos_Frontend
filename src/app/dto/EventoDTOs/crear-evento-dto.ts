import { Localidades } from "./localidades";
import { TipoEvento } from "./tipo-evento";

export interface CrearEventoDTO {
    nombre : string,
    descripcion : string,
    direccion : string,
    ciudad : string,
    fecha : Date,
    tipo : TipoEvento,
    imagenPoster : string,
    imagenLocalidades : string,
    localidades : Localidades[]
}
