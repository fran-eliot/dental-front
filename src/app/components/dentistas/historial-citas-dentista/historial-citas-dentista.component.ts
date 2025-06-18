import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { Appointment } from '../../../model/Appoinment';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';

@Component({
  selector: 'app-historial-citas-dentista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-citas-dentista.component.html',
  styleUrl: './historial-citas-dentista.component.css'
})

export class HistorialCitasDentistaComponent implements OnInit {
  citas: AppointmentResponseDto[] = [];
  error = '';
  loading = true;

  constructor(private appointmentService: AppointmentsService) {}

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
        this.citas = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
}
