import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformacionEventoDTO } from '../dto/EventoDTOs/informacion-evento-dto'; // Asegúrate de tener el DTO adecuado

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventoSeleccionado = new BehaviorSubject<InformacionEventoDTO | null>(null);

  // Obtenemos el cupon seleccionado
  getEventoSeleccionado() {
    return this.eventoSeleccionado.asObservable();
  }

  // Establecemos el cupon seleccionado
  setEventoSeleccionado(evento: InformacionEventoDTO) {
    this.eventoSeleccionado.next(evento);
  }
}