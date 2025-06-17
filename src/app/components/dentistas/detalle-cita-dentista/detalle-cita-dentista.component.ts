import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';

@Component({
  selector: 'app-detalle-cita-dentista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-cita-dentista.component.html',
  styleUrl: './detalle-cita-dentista.component.css'
})

export class DetalleCitaDentistaComponent implements OnInit {
  cita: any;
  error = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentsService
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const professionalId:number = Number(localStorage.getItem('professionalId'));
    let citas = [];

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }
    if (id) {
      this.appointmentService.getAppointments({ professional_id: professionalId, date_appointments: '' }).subscribe({
      next: (data) => {
        citas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la cita.';
        this.loading = false;
      }
    });

    this.cita = citas.find(cita => cita.id === id);
    } else {
      this.error = 'No se pudo obtener el ID de la cita.';
      this.loading = false;
      return;
    }
  }

  formatDate(date: string): string {
    return dayjs(date).format('dddd DD/MM/YYYY');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}
