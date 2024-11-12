import { DetallesCarrito } from "./detalles-carrito";

export interface VistaCarritoDTO {
    id_carrito : string,
    detallesCarrito: DetallesCarrito[],
    fecha : string
}
