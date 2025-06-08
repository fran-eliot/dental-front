import { Component } from '@angular/core';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generador-disponibilidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generador-disponibilidades.component.html',
  styleUrl: './generador-disponibilidades.component.css'
})
export class GeneradorDisponibilidadesComponent {
  mensaje = '';
  success = false;

  constructor(private availabilityService: AvailabitlityService) {}

  generar() {
    this.availabilityService.generateWeek().subscribe({
      next: () => {
        this.success = true;
        this.mensaje = 'Disponibilidades generadas correctamente.';
      },
      error: (err) => {
        this.success = false;
        this.mensaje = 'Error al generar disponibilidades.';
        console.error(err);
      }
    });
  }
}
