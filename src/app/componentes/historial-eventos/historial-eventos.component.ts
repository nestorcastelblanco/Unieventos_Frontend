import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-eventos.component.html',
  styleUrls: ['./historial-eventos.component.css']
})
export class HistorialEventosComponent {
  // Definición de eventos
  evento1 = {
    id: 1,
    imagen: "https://cdn.prod.website-files.com/632a406bba53c60f9ca58a26/633b15c4f446d8303de41edd_IMA0000460000046468.jpeg",
    tipo: 'Grado',
    nombre: 'Concierto de Rock',
    direccion: 'Av. Principal 123',
    ciudad: 'Ciudad de México',
    descripcion: 'Un concierto en vivo de las mejores bandas de rock.',
    fecha: '2024-11-10'
  };

  evento2 = {
    id: 2,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcASSO6QwshmyyVUKU3u45m0Bgf99S9JvkfA&s",
    tipo: 'Concierto',
    nombre: 'Festival de Comida',
    direccion: 'Calle del Sabor 456',
    ciudad: 'Guadalajara',
    descripcion: 'Un festival con la mejor comida de la ciudad.',
    fecha: '2024-11-15'
  };

  evento3 = {
    id: 3,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcASSO6QwshmyyVUKU3u45m0Bgf99S9JvkfA&s",
    tipo: 'Misa',
    nombre: 'Exposición de Arte',
    direccion: 'Calle del Arte 789',
    ciudad: 'Monterrey',
    descripcion: 'Una muestra de los artistas locales más destacados.',
    fecha: '2024-11-20'
  };

  evento4 = {
    id: 4,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-xqD2qPAxOskpNqaH2RSZZF0KrRDh7Au-aA&s",
    nombre: 'Maratón Anual',
    tipo: 'Concierto',
    direccion: 'Parque Central 101',
    ciudad: 'Tijuana',
    descripcion: 'Participa en la maratón más esperada del año.',
    fecha: '2024-12-01'
  };

  // Crear un array para manejar múltiples eventos
  eventos = [this.evento1, this.evento2, this.evento3, this.evento4];
}
