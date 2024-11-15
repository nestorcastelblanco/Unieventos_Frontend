import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { AuthService } from '../../servicios/auth.service';
import { ClienteService } from '../../servicios/cliente.service';
import { ItemOrdenDTO } from '../../dto/OrdenDTOs/item-orden-dto';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js'; // Importar componentes de Chart.js
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, OnDestroy{
  reportForm!: FormGroup;
  ordersInRange: ItemOrdenDTO[] = [];
  showReport: boolean = false;
  @ViewChild('ordersChart', { static: false }) chartElement: any; // Referencia al gráfico

  chart: any; // Variable para el gráfico

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend); // Registrar componentes
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private crearFormulario() {
    this.reportForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  private parseToArrayDate(date: string | Date): number[] {
    const dateObj = new Date(date);
    return [
        dateObj.getUTCFullYear(),
        dateObj.getUTCMonth() + 1,
        dateObj.getUTCDate(),
        dateObj.getUTCHours(),
        dateObj.getUTCMinutes(),
        dateObj.getUTCSeconds(),
        dateObj.getUTCMilliseconds() * 1000000
    ];
  }

  private parseOrderDate(orderFecha: any): number[] {
    if (Array.isArray(orderFecha)) return orderFecha;
    if (orderFecha instanceof Date) return this.parseToArrayDate(orderFecha);
    if (typeof orderFecha === 'string') return this.parseToArrayDate(orderFecha);
    return [];
  }

  private filterCancelledOrdersByDate(orders: any[], startDate: string, endDate: string) {
    const startArray = this.parseToArrayDate(startDate);
    const endArray = this.parseToArrayDate(endDate);

    return orders.filter(order => {
        const orderArray = this.parseOrderDate(order.fecha);

        const isCancelledInDateRange = order.estado === 'PAGADA' &&
            this.compareDateArrays(orderArray, startArray) >= 0 &&
            this.compareDateArrays(orderArray, endArray) <= 0;

        return isCancelledInDateRange;
    });
  }

  private compareDateArrays(orderArray: number[], comparisonArray: number[]): number {
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i] < comparisonArray[i]) return -1;
        if (orderArray[i] > comparisonArray[i]) return 1;
    }
    return 0;
  }

  generateReport() {
    if (this.reportForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }
  
    const { startDate, endDate } = this.reportForm.value;
  
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      console.warn('La fecha de inicio no puede ser mayor que la fecha de fin');
      return;
    }
  
    this.authService.obtenerHistorialOrdenes().subscribe({
      next: (data) => {
        this.ordersInRange = this.filterCancelledOrdersByDate(data.respuesta, startDate, endDate);
        this.showReport = this.ordersInRange.length > 0;
  
        if (this.showReport) {
          // Usa setTimeout para garantizar que el DOM se actualice
          setTimeout(() => {
            this.createChart();
          });
        } else {
          console.warn('No hay órdenes canceladas en el rango de fechas seleccionado');
        }
      },
      error: (error) => console.error('Error al obtener el historial de órdenes:', error),
    });
  }
    

  private createChart() {
    if (!this.chartElement) {
      console.error('chartElement no encontrado');
      return;
    }
  
    const ctx = this.chartElement.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Contexto 2D no encontrado en el canvas');
      return;
    }
  
    if (this.chart) {
      this.chart.destroy(); // Asegúrate de destruir el gráfico anterior
    }
  
    console.log('Creando gráfico con datos:', this.ordersInRange);
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ordersInRange.map(order => order.id),
        datasets: [
          {
            label: 'Total por Orden',
            data: this.ordersInRange.map(order => order.total),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Asegura que el canvas se ajuste correctamente
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }  

  downloadPDF() {
    const doc = new jsPDF();
    let yOffset = 20; // Punto de inicio para el contenido

    doc.setFontSize(16);
    doc.text('Reporte de Órdenes Canceladas', 10, yOffset);
    
    // Cambiamos el tamaño de fuente para el contenido
    doc.setFontSize(12);
    yOffset += 10;

    this.ordersInRange.forEach((order, index) => {
      doc.setFont("helvetica", "bold");
      doc.text(`Orden ${index + 1}:`, 10, yOffset);
      doc.setFont("helvetica", "normal");
      yOffset += 8;
      
      doc.text(`ID: ${order.id}`, 20, yOffset);
      yOffset += 8;
      doc.text(`Fecha: ${new Date(order.fecha).toLocaleDateString()}`, 20, yOffset);
      yOffset += 8;
      doc.text(`Total: $${order.total.toFixed(2)}`, 20, yOffset);
      yOffset += 8;
      doc.text(`Estado: ${order.estado}`, 20, yOffset);
      
      yOffset += 12; // Espacio adicional entre órdenes

      // Salto de página si el espacio es insuficiente
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reiniciar posición en la nueva página
      }
    });

    doc.save('reporte_ordenes_canceladas.pdf');
}

}
