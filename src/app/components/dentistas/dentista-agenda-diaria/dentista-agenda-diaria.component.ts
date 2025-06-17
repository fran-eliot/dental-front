import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
=======
import dayjs from 'dayjs';
>>>>>>> 4f1c4ee5003cfdb699f0be661ee3165334df5f30
import { AppointmentsService } from '../../../service/appointment/appointments.service';

@Component({
  selector: 'app-dentista-agenda-diaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentista-agenda-diaria.component.html',
  styleUrl: './dentista-agenda-diaria.component.css'
})
export class DentistaAgendaDiariaComponent implements OnInit {
  citasHoy: any[] = [];
  loading:boolean = true;
  error = '';
  today: string = dayjs().format('YYYY-MM-DD');
  patients: any[] = [];

  constructor(
<<<<<<< HEAD
    private appointmentService: AppointmentsService
=======
    private appointmentService: AppointmentsService,
    private authService: AuthService
>>>>>>> 4f1c4ee5003cfdb699f0be661ee3165334df5f30
  ) {}

  ngOnInit(): void {
    const professionalId:number = Number(localStorage.getItem('professionalId'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.appointmentService
      .getAppointments({ professional_id: professionalId, date_appointments: this.today })
      .subscribe({
        next: (data) => {
          this.citasHoy = data;
          this.citasHoy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar las citas de hoy.';
          this.loading = false;
        }
      });

    // Fetch patients and store in component property
    this.appointmentService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: () => {
        this.error = 'Error al cargar los pacientes.';
        this.loading = false;
      }
    });
  }

  formatHour(fecha: string): string {
    return dayjs(fecha).format('HH:mm');
  }
}
