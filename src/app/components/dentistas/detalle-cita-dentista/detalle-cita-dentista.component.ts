import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
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
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe({
        next: (data) => {
          this.cita = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar la cita.';
          this.loading = false;
        }
      });
    }
  }

  formatDate(date: string): string {
    return dayjs(date).format('dddd DD/MM/YYYY');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}
