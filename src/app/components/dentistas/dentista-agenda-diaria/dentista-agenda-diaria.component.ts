import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import { HistorialCitasPacienteModalComponent } from '../historial-citas-paciente-modal/historial-citas-paciente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dentista-agenda-diaria',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinner,FormsModule,MatSnackBarModule],
  templateUrl: './dentista-agenda-diaria.component.html',
  styleUrl: './dentista-agenda-diaria.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // Al aparecer
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // Al desaparecer
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DentistaAgendaDiariaComponent implements OnInit {
  citasHoy: AppointmentResponseDto[] = [];
  loading:boolean = true;
  error = '';
  today: string = dayjs().format('YYYY-MM-DD');
  patients: any[] = [];

  constructor(
    private appointmentService: AppointmentsService, private dialog: MatDialog,
      private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const professionalId:number = Number(localStorage.getItem('professionalId'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.appointmentService
      .getAppointmentsAll({ professional_id: professionalId, date_appointments: this.today })
      .subscribe({
        next: (data) => {
          this.citasHoy = data;
          this.citasHoy.sort((a, b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar las citas de hoy.';
          this.loading = false;
        }
      });
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(time: string): string {
    return time.slice(0, 5); // "09:00:00" => "09:00"
  }

  abrirHistorial(patientId: number): void {
    this.dialog.open(HistorialCitasPacienteModalComponent, {
      width: '700px',
      data: { patientId }
    });
  }

  getEstadoClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmada':
        return 'estado-confirmada';
      case 'anulada':
        return 'estado-anulada';
      case 'pendiente':
        return 'estado-pendiente';
      case 'realizada':
        return 'estado-realizada';
      default:
        return '';
    }
  }

  actualizarCita(cita: AppointmentResponseDto) {
    const nota = cita.motivo_cancelacion?.trim() || '';
    const updateData = {
      status_appointments: cita.estado,
      cancellation_reason_appointments: nota
    };

   this.appointmentService.updateAppointmentStatus(cita.id_reserva, updateData)
    .subscribe({
      next: () => {
        this.snackBar.open('Cita actualizada con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: () => {
        this.snackBar.open('Error al actualizar la cita', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

}
