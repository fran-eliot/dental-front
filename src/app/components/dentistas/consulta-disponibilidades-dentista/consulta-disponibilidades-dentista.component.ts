import { ProfessionalAvailabitity } from './../../../model/ProfessionalAvailability';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';
import { Status } from '../../../model/Status';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-consulta-disponibilidades-dentista',
  standalone: true,
  imports: [CommonModule,MatProgressSpinner,FormsModule, MatSnackBarModule],
  templateUrl: './consulta-disponibilidades-dentista.component.html',
  styleUrl: './consulta-disponibilidades-dentista.component.css'
})

export class ConsultaDisponibilidadesDentistaComponent implements OnInit {
  disponibilidades: ProfessionalAvailabitity[] = [];
  error = '';
  filtroPeriodo = 'todos';
  loading = true;
  fechaSeleccionada: string = dayjs().format('YYYY-MM-DD');
  statusValues = Object.values(Status);

  constructor(private availabilityService: AvailabitlityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  cargarDisponibilidades(): void {
    const professionalId: number = Number(localStorage.getItem('professional_id'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';

    this.availabilityService.getAvailabilities(professionalId, this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.disponibilidades = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las disponibilidades.';
        this.loading = false;
      }
    });
  }

  actualizarFecha(): void {
    this.cargarDisponibilidades();
  }

  filtrarDisponibilidades() {
    if (this.filtroPeriodo === 'todos') return this.disponibilidades;
    return this.disponibilidades.filter(d => d.slot.period.toLowerCase() === this.filtroPeriodo);
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(time: string): string {
    return time.slice(0, 5); // "09:00:00" => "09:00"
  }

  updateStatus(id: number, status: Status) {
    this.availabilityService.updateStatus(id, status).subscribe({
      next: () => {
        const availability = this.disponibilidades.find(a => a.id === id);
        if (availability) availability.status = status;

        this.snackBar.open('Estado actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: () => {
        this.snackBar.open('Error al actualizar estado', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  getEstadoClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'libre':
        return 'estado-libre';
      case 'reservado':
        return 'estado-reservado';
      case 'no disponible':
        return 'estado-no-disponible';
      default:
        return '';
    }
  }
}
