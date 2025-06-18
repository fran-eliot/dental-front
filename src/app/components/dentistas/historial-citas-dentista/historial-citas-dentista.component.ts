import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import dayjs from 'dayjs';

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
    this.appointmentService.getAppointmentsForCurrentDentist().subscribe({
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
