import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;
import { Appointment } from '../../../model/Appoinment';
import { AppointmentsService } from '../../../service/appointment/appointments.service';
import { Router, RouterOutlet } from '@angular/router';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { AppointmentResponseDto } from '../../../model/AppointmentResponseDto';
import { HistorialCitasPacienteModalComponent } from '../historial-citas-paciente-modal/historial-citas-paciente-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dentist-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dentist-dashboard.component.html',
  styleUrl: './dentist-dashboard.component.css'
})

export class DentistDashboardComponent implements OnInit {
  dentistName = '';
  todayAppointments: AppointmentResponseDto[] = [];
  loading:boolean = true;
  error = '';
  today: string =  dayjs().format('YYYY-MM-DD');
  patients: any[] = [];
  todayFormateado: string = new Date(this.today).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  constructor(private appointmentService: AppointmentsService,
    private professionalService: ProfessionalService,
    private router: Router,
    private dialog: MatDialog){}


  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id');
    console.log('User ID:', user_id);

    if (!user_id) {
      this.error = 'No se pudo obtener el ID del usuario.';
      this.loading = false;
      return;
    }

    this.professionalService.getProfessionalByIdUser(Number(user_id)).subscribe({
      next: (professional) => {
        if (professional && professional.id_professionals) {
          const professionalId = professional.id_professionals;
          const dentistName = professional.name_professionals+" "+professional.last_name_professionals || 'Dentista Desconocido';
          console.log('Professional ID:', professionalId);
          console.log('DentistName:', dentistName);
          localStorage.setItem('professional_id', professionalId.toString());
          localStorage.setItem('fullName', dentistName);
          this.dentistName = dentistName;
          this.loading = true; // Iniciar el loading antes de hacer la solicitud

          // ✅ Ahora sí, usamos el ID correctamente
          this.appointmentService
            .getAppointmentsAll({ professional_id: professionalId, date_appointments: this.today })
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

          this.appointmentService.getPatients().subscribe({
            next: (patients) => {
              this.patients = patients;
            },
            error: () => {
              this.error = 'Error al cargar los pacientes.';
              this.loading = false;
            }
          });
        } else {
          this.error = 'No se pudo obtener el ID del profesional.';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Error al buscar profesional asociado al usuario.';
        this.loading = false;
      }
    });
  }


  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }


  isToday(date: string): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
  }

  abrirHistorial(patientId: number): void {
    this.dialog.open(HistorialCitasPacienteModalComponent, {
      width: '700px',
      data: { patientId }
    });
  }

}

