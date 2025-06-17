import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../model/Appoinment';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';

@Component({
  selector: 'app-dentist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentist-dashboard.component.html',
  styleUrl: './dentist-dashboard.component.css'
})

export class DentistDashboardComponent implements OnInit {
  dentistName = 'Nombre Apellido'; // Puedes reemplazar con datos reales del usuario logueado

  todayAppointments: Appointment[] = [];
  loading:boolean = true;
  error = '';
  today: string = dayjs().format('YYYY-MM-DD');

  constructor(private appointmentService: AppointmentsService,
    private authService: AuthService) {}

   ngOnInit(): void {
    const professional = this.authService.getCurrentUser(); // o similar según tu auth
    const professionalId = professional?.id;

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.appointmentService
      .getAppointments({ professional_id: professionalId, date_appointments: this.today })
      .subscribe({
        next: (data) => {
          this.todayAppointments = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar las reservas de hoy.';
          this.loading = false;
        }
      });
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}

