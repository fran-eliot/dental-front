import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
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
    private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    const professionalId:number = Number(localStorage.getItem('professionalId'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.appointmentService
      .getAppointmentsAll({ professional_id: professionalId, date_appointments: this.today })
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
