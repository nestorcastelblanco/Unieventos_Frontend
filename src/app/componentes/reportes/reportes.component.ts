import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'; // Asegúrate de importar el servicio correctamente
import { jsPDF } from 'jspdf';
import { MensajeDTO } from '../../dto/TokenDTOs/MensajeDTO'; // Asegúrate de tener el modelo adecuado para la respuesta

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  // Propiedades para los filtros
  event: string = '';
  startDate: string = '';
  endDate: string = '';

  // Propiedad para almacenar la lista de eventos
  events: any[] = [];

  // Propiedades para los datos del reporte
  percentSold: number = 0;
  totalEarned: number = 0;
  showReport: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Llama al método para listar eventos al cargar el componente
    this.listarEventos();
  }

  listarEventos() {
    this.authService.listarEventos().subscribe({
      next: (response: MensajeDTO) => {
        // Asume que los eventos vienen en el payload de la respuesta
        this.events = response.respuesta || []; // Ajusta según la estructura de tu respuesta
      },
      error: (err) => {
        console.error('Error al listar eventos', err);
      }
    });
  }

  // Método para manejar la generación del reporte
  generateReport() {
    // Aquí podrías filtrar los eventos basados en `event`, `startDate`, y `endDate`.
    this.percentSold = 75; // Ejemplo de porcentaje vendido
    this.totalEarned = 5000; // Ejemplo de total ganado
    this.showReport = true;
  }

  // Método para descargar el reporte en PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Evento', 10, 10);
    doc.text(`Porcentaje Vendido por Localidad: ${this.percentSold}%`, 10, 20);
    doc.text(`Total Ganado: $${this.totalEarned}`, 10, 30);
    doc.save('reporte_evento.pdf');
  }
}
