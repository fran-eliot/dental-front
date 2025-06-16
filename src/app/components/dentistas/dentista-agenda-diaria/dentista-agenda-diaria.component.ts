import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs'; 

@Component({
  selector: 'app-dentista-agenda-diaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentista-agenda-diaria.component.html',
  styleUrl: './dentista-agenda-diaria.component.css'
})
export class DentistaAgendaDiariaComponent implements OnInit {
  citasHoy: any[] = [];
  loading = true;
  error = '';

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const profesionalId = this.authService.getUserId();
    const hoy = dayjs().format('YYYY-MM-DD');

    this.appointmentService.getAppointmentsByProfessional(profesionalId).subscribe({
      next: (data) => {
        this.citasHoy = data.filter(cita => dayjs(cita.date).format('YYYY-MM-DD') === hoy);
        this.citasHoy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las citas de hoy';
        this.loading = false;
      }
    });
  }

  formatHour(fecha: string): string {
    return dayjs(fecha).format('HH:mm');
  }
}
