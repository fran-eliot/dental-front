import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';

@Component({
  selector: 'app-historial-citas-dentista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-citas-dentista.component.html',
  styleUrl: './historial-citas-dentista.component.css'
})

export class HistorialCitasDentistaComponent implements OnInit {
  citas: any[] = [];
  error = '';
  loading = true;

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const professionalId:number = Number(localStorage.getItem('professionalId'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.appointmentService.getAppointments({ professional_id: professionalId, date_appointments: '' }).subscribe({
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

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}
