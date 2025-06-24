import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-limpieza-disponibilidades',
  standalone: true,
  imports: [CommonModule,FormsModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './limpieza-disponibilidades.component.html',
  styleUrl: './limpieza-disponibilidades.component.css'
})
export class LimpiezaDisponibilidadesComponent {
  fechaLimite: string = '';
  loading: boolean = false;

  constructor(private availabilityService: AvailabitlityService,
    private snackBar: MatSnackBar
  ) {}

  limpiar() {
    if (!this.fechaLimite) {
      this.snackBar.open('Debes seleccionar una fecha válida.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.loading = true;

    this.availabilityService.cleanOld(this.fechaLimite).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Disponibilidades anteriores eliminadas correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Error al eliminar disponibilidades.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

}
