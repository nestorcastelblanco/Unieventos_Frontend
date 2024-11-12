// orden.model.ts
export class DetalleOrden {
    idDetalleCarrito: string;
    idEvento: string;
    precio: number;
    nombreLocalidad: string;
    cantidad: number;
  
    constructor(
      idDetalleCarrito: string,
      idEvento: string,
      precio: number,
      nombreLocalidad: string,
      cantidad: number
    ) {
      this.idDetalleCarrito = idDetalleCarrito;
      this.idEvento = idEvento;
      this.precio = precio;
      this.nombreLocalidad = nombreLocalidad;
      this.cantidad = cantidad;
    }
  }
  
  export class Orden {
    idCliente: string;
    fecha: string;
    codigoPasarela: string;
    detallesOrden: DetalleOrden[];
    pago: any;  // Dependerá de la estructura de 'Pago'
    id: string;
    total: number;
    idCupon: string;
    estado: string;
  
    constructor(
      idCliente: string,
      fecha: string,
      codigoPasarela: string,
      detallesOrden: DetalleOrden[],
      pago: any,
      ordenId: string,
      total: number,
      idCupon: string,
      estado: string
    ) {
      this.idCliente = idCliente;
      this.fecha = fecha;
      this.codigoPasarela = codigoPasarela;
      this.detallesOrden = detallesOrden;
      this.pago = pago;
      this.id = ordenId;
      this.total = total;
      this.idCupon = idCupon;
      this.estado = estado;
    }
  }
  