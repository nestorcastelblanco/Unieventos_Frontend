import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformacionCuponDTO } from '../dto/CuponDTOs/informacion-cupon-dto'; // Asegúrate de tener el DTO adecuado

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private cuponSeleccionado = new BehaviorSubject<InformacionCuponDTO | null>(null);

  // Obtenemos el cupon seleccionado
  getCuponSeleccionado() {
    return this.cuponSeleccionado.asObservable();
  }

  // Establecemos el cupon seleccionado
  setCuponSeleccionado(cupon: InformacionCuponDTO) {
    this.cuponSeleccionado.next(cupon);
  }
}

