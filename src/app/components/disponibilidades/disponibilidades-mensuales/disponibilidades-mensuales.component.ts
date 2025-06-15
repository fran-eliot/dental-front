import { Component } from '@angular/core';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disponibilidades-mensuales',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './disponibilidades-mensuales.component.html',
  styleUrl: './disponibilidades-mensuales.component.css'
})
export class DisponibilidadesMensualesComponent {

  mes: number = new Date().getMonth() + 1; // 1-12
  anio: number = new Date().getFullYear();
  mensaje: string = '';
  success: boolean = true;

  constructor(private availabilityService: AvailabitlityService) {}

  generarMes() {
    const dto = { month: this.mes, year: this.anio };

    this.availabilityService.generateAvailabilitiesForMonth(dto).subscribe({
      next: res => {
        this.mensaje = res.message;
        this.success = true;
      },
      error: err => {
        this.mensaje = err?.error?.message || 'Error al generar disponibilidades';
        this.success = false;
      }
    });
}

}
