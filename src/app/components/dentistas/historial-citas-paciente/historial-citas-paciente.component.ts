import { Component, Input, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import * as dayjsLib from 'dayjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const dayjs = dayjsLib.default;

@Component({
  selector: 'app-historial-citas-paciente',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './historial-citas-paciente.component.html',
  styleUrl: './historial-citas-paciente.component.css'
})
export class HistorialCitasPacienteComponent implements OnInit {
  @Input() patientId!: number;
  citas: AppointmentResponseDto[] = [];
  loading = true;
  error = '';

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    if (!this.patientId) {
      this.error = 'ID de paciente no válido.';
      this.loading = false;
      return;
    }

    this.appointmentService.getAllAppointementsByPatient(this.patientId).subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el historial.';
        this.loading = false;
      }
    });
  }

  formatFecha(fecha: string): string {
    return dayjs(fecha).format('DD/MM/YYYY');
  }

  formatHora(hora: string): string {
    return hora;
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
