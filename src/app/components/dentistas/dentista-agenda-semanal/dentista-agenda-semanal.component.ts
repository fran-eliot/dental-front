import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
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
    private appointmentService: AppointmentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const profesionalId = this.authService.getUserId();
    const hoy = dayjs();
    const finSemana = hoy.add(7, 'day');

    this.appointmentService.getAppointmentsByProfessional(profesionalId).subscribe({
      next: (data) => {
        this.citasSemana = data.filter(cita => {
          const citaDate = dayjs(cita.date);
          return citaDate.isAfter(hoy.subtract(1, 'day')) && citaDate.isBefore(finSemana.add(1, 'day'));
        });
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
}
