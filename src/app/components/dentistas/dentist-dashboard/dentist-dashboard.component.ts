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
  patients: any[] = [];

  constructor(private appointmentService: AppointmentsService){}
    // private authService: AuthService) {}

   ngOnInit(): void {
    // const professional = this.authService.getCurrentUser(); // o similar según tu auth
    // const professionalId = professional?.id;
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
          this.todayAppointments = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar las reservas de hoy.';
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

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }

  getPatientName(patient_id: number):string {
    const patient = this.patients.find(p => p.id === patient_id);
    return patient ? `Paciente ${patient.name}` : 'Paciente Desconocido';
  }

  getTreatmentName(treatment_id: number): string {
    const treatment = this.todayAppointments.find(a => a.treatments_id === treatment_id);
    return treatment ? `Tratamiento ${treatment.treatments_id}` : 'Tratamiento Desconocido';
  }
  isToday(date: string): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
  }

  viewAppointmentDetails(appointment: Appointment): void {
    // Aquí puedes implementar la lógica para mostrar los detalles de la cita
    console.log('Detalles de la cita:', appointment);
  }

  cancelAppointment(id_appointment: number): void {
    // Aquí puedes implementar la lógica para cancelar la cita
    console.log('Cancelar cita:', id_appointment);
    // Por ejemplo, podrías abrir un modal de confirmación y luego llamar a un servicio para cancelar la cita
  }

  rescheduleAppointment(id_appointment: number): void {
    // Aquí puedes implementar la lógica para reprogramar la cita
    console.log('Reprogramar cita:', id_appointment);
  }

}

