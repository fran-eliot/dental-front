import { Component, Inject, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentResponse } from '../../../model/AppointmentResponse';
const dayjs = dayjsLib.default;


@Component({
  selector: 'app-historial-citas-paciente-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule,MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './historial-citas-paciente-modal.component.html',
  styleUrl: './historial-citas-paciente-modal.component.css'
})
export class HistorialCitasPacienteModalComponent implements OnInit {
  citas: AppointmentResponse[] = [];
  loading = true;
  error = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number },
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.appointmentService.getAllAppointementsByPatient(this.data.patientId).subscribe({
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
}
