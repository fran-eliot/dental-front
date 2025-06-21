import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HistorialCitasPacienteModalComponent } from '../historial-citas-paciente-modal/historial-citas-paciente-modal.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-historial-citas-dentista',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinner,FormsModule],
  templateUrl: './historial-citas-dentista.component.html',
  styleUrl: './historial-citas-dentista.component.css'
})

export class HistorialCitasDentistaComponent implements OnInit {
  citas: AppointmentResponseDto[] = [];
  error = '';
  loading = true;
  filtroPaciente: string = '';

  constructor(private appointmentService: AppointmentsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const professionalId = Number(localStorage.getItem('professional_id'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    const fechaInicio = '2000-01-01'; // Inicio arbitrario (puedes ajustar si sabes cuándo empezó a trabajar)
    const fechaFin = dayjs().format('YYYY-MM-DD'); // Hoy

    this.appointmentService.getAppointmentsByDates({
      professional_id: professionalId,
      start_date: fechaInicio,
      end_date: fechaFin
    }).subscribe({
      next: (data) => {
        this.citas = data
        .filter(c => dayjs(c.fecha_cita).isBefore(dayjs(), 'day'))
        .sort((a, b) => new Date(b.fecha_cita).getTime() - new Date(a.fecha_cita).getTime());
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el historial.';
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

  get citasFiltradas(): AppointmentResponseDto[] {
    return this.citas.filter(cita =>
      cita.paciente?.toLowerCase().includes(this.filtroPaciente.toLowerCase())
    );
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

}
