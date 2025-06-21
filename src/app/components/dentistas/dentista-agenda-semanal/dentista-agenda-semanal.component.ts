import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
import { Dayjs } from 'dayjs';
const dayjs = dayjsLib.default;
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
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
  citasPorDia: { [fecha: string]: AppointmentResponseDto[] } = {};
  loading = true;
  error = '';
  startOfWeek!: Dayjs;
  endOfWeek!: Dayjs;
  semanaOffset = 0; // Offset para navegar entre semanas

  constructor(
    private appointmentService: AppointmentsService, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarCitasSemana();
  }

  cargarCitasSemana(): void {
    this.loading = true;
    const professionalId = Number(localStorage.getItem('professional_id'));

    this.startOfWeek = dayjs().add(this.semanaOffset, 'week').startOf('isoWeek');
    this.endOfWeek = this.startOfWeek.endOf('isoWeek');

    const startDate = this.startOfWeek.format('YYYY-MM-DD');
    const endDate = this.endOfWeek.format('YYYY-MM-DD');

    this.appointmentService.getAppointmentsByDates({ professional_id: professionalId, start_date: startDate, end_date: endDate })
      .subscribe({
        next: (data) => {
          this.citasSemana = data;
          this.organizarCitasPorDia();
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudieron cargar las citas de la semana';
          this.loading = false;
        }
      });
  }

  organizarCitasPorDia(): void {
    this.citasPorDia = {};
    for (const cita of this.citasSemana) {
      const fecha = dayjs(cita.fecha_cita).format('YYYY-MM-DD');
      if (!this.citasPorDia[fecha]) {
        this.citasPorDia[fecha] = [];
      }
      this.citasPorDia[fecha].push(cita);
    }
  }

  getDiasCitas(): string[] {
    return Object.keys(this.citasPorDia);
  }

  semanaAnterior(): void {
    this.semanaOffset--;
    this.cargarCitasSemana();
  }

  semanaSiguiente(): void {
    this.semanaOffset++;
    this.cargarCitasSemana();
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

  getRangoSemana(): string {
    return `Semana del ${this.startOfWeek.format('DD/MM/YYYY')} - ${this.endOfWeek.format('DD/MM/YYYY')}`;
  }


}
