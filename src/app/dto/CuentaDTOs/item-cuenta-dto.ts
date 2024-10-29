import { EstadoCuenta } from "./estado-cuenta";
import { Rol } from "./rol";

export interface ItemCuentaDTO {
    id : string,
    nombre : string,
    email : string,
    telefono : string,
    estadoCuenta : EstadoCuenta,
    rol : Rol
}
