import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
// import 'dayjs/locale/es';
// dayjs.locale('es');
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import { HistorialCitasPacienteModalComponent } from '../historial-citas-paciente-modal/historial-citas-paciente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dentista-agenda-semanal',
  standalone: true,
  imports: [MatIconModule,MatProgressSpinner,CommonModule],
  templateUrl: './dentista-agenda-semanal.component.html',
  styleUrl: './dentista-agenda-semanal.component.css'
})

export class DentistaAgendaSemanalComponent implements OnInit {
  citasSemana: AppointmentResponseDto[] = [];
  loading = true;
  error = '';

  constructor(
    private appointmentService: AppointmentsService, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const professionalId:number = Number(localStorage.getItem('professional_id'));
    console.log('Professional ID:', professionalId);
    const hoy = dayjs();
    const finSemana = hoy.add(7, 'day');

    const startDate = hoy.format('YYYY-MM-DD');
    const endDate = finSemana.format('YYYY-MM-DD');
    this.appointmentService.getAppointmentsByDates({ professional_id: professionalId, start_date: startDate, end_date: endDate }).subscribe({
      next: (data) => {
        this.citasSemana = data;
        this.citasSemana.sort((a, b) => new Date(a.fecha_cita).getTime() - new Date(b.fecha_cita).getTime());
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las citas de la semana';
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(time: string): string {
    return time.slice(0, 5); // "09:00:00" => "09:00"
  }

  abrirHistorial(patientId: number): void {
    this.dialog.open(HistorialCitasPacienteModalComponent, {
      width: '700px',
      data: { patientId }
    });
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // formatFecha(fecha: string): string {
  //   return dayjs(fecha).format('dddd, D [de] MMMM [de] YYYY');
  // }

  get citasPorDia(): { [dia: string]: AppointmentResponseDto[] } {
    const citasPorDia: { [dia: string]: AppointmentResponseDto[] } = {};
    this.citasSemana.forEach(cita => {
      const dia = dayjs(cita.fecha_cita).format('dddd DD/MM/YYYY');
      if (!citasPorDia[dia]) {
        citasPorDia[dia] = [];
      }
      citasPorDia[dia].push(cita);
    });
    return citasPorDia;
  }

  getDiasCitas(): string[] {
    // If citasPorDia is an object with day names as keys
    return Object.keys(this.citasPorDia || {});
  }
}
