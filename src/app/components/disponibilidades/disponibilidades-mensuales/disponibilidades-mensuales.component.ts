import { Component } from '@angular/core';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disponibilidades-mensuales',
  standalone: true,
  imports: [FormsModule,CommonModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './disponibilidades-mensuales.component.html',
  styleUrl: './disponibilidades-mensuales.component.css'
})
export class DisponibilidadesMensualesComponent {

  mes: number = new Date().getMonth() + 1; // 1-12
  anio: number = new Date().getFullYear();
  loading: boolean = false;

  constructor(private availabilityService: AvailabitlityService,
    private snackBar: MatSnackBar
  ) {}

  generarMes() {
    this.loading = true;
    const dto = { month: this.mes, year: this.anio };

    this.availabilityService.generateAvailabilitiesForMonth(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.open(res.message, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Error al generar disponibilidades';
        this.snackBar.open(msg, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }


}
