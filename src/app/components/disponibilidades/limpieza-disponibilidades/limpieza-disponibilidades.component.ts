import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';

@Component({
  selector: 'app-limpieza-disponibilidades',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './limpieza-disponibilidades.component.html',
  styleUrl: './limpieza-disponibilidades.component.css'
})
export class LimpiezaDisponibilidadesComponent {
  fechaLimite: string = '';
  mensaje = '';
  success = false;

  constructor(private availabilityService: AvailabitlityService) {}

  limpiar() {
    if (!this.fechaLimite) {
      this.mensaje = 'Debes seleccionar una fecha válida.';
      this.success = false;
      return;
    }

    this.availabilityService.cleanOld(this.fechaLimite).subscribe({
      next: () => {
        this.success = true;
        this.mensaje = 'Disponibilidades anteriores eliminadas correctamente.';
      },
      error: (err) => {
        this.success = false;
        this.mensaje = 'Error al eliminar disponibilidades.';
        console.error(err);
      }
    });
  }
}
