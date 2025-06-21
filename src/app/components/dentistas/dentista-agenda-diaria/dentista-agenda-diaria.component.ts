import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import { HistorialCitasPacienteModalComponent } from '../historial-citas-paciente-modal/historial-citas-paciente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dentista-agenda-diaria',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinner],
  templateUrl: './dentista-agenda-diaria.component.html',
  styleUrl: './dentista-agenda-diaria.component.css'
})
export class DentistaAgendaDiariaComponent implements OnInit {
  citasHoy: AppointmentResponseDto[] = [];
  loading:boolean = true;
  error = '';
  today: string = dayjs().format('YYYY-MM-DD');
  patients: any[] = [];

  constructor(
    private appointmentService: AppointmentsService, private dialog: MatDialog) {}

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
          this.citasHoy.sort((a, b) => new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime());
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar las citas de hoy.';
          this.loading = false;
        }
      });

    // // Fetch patients and store in component property
    // this.appointmentService.getPatients().subscribe({
    //   next: (patients) => {
    //     this.patients = patients;
    //   },
    //   error: () => {
    //     this.error = 'Error al cargar los pacientes.';
    //     this.loading = false;
    //   }
    // });
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
}
