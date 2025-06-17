import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';

@Component({
  selector: 'app-dentista-agenda-semanal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentista-agenda-semanal.component.html',
  styleUrl: './dentista-agenda-semanal.component.css'
})

export class DentistaAgendaSemanalComponent implements OnInit {
  citasSemana: any[] = [];
  loading = true;
  error = '';

  constructor(
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    const professionalId:number = Number(localStorage.getItem('professionalId'));
    const hoy = dayjs();
    const finSemana = hoy.add(7, 'day');

    const startDate = hoy.format('YYYY-MM-DD');
    const endDate = finSemana.format('YYYY-MM-DD');
    this.appointmentService.getAppointments({ professional_id: professionalId, date_appointments: `${startDate},${endDate}` }).subscribe({
      next: (data) => {
        this.citasSemana = data;
        this.citasSemana.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las citas de la semana';
        this.loading = false;
      }
    });
  }

  formatDateTime(fecha: string): string {
    return dayjs(fecha).format('dddd DD/MM - HH:mm');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }

  citasPorDia(fecha: string): any[] {
    return this.citasSemana.filter(cita => dayjs(cita.date).isSame(dayjs(fecha), 'day'));
  }

  getDiasCitas(): string[] {
    // If citasPorDia is an object with day names as keys
    return Object.keys(this.citasPorDia || {});
  }
}
