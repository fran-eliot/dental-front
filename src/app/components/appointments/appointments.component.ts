import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../service/appointment/appointments.service';
import { Professional } from '../../model/Professional';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  filterForm: FormGroup;
  appointments: any[] = [];
  appointmentsFiltradas: any[] = [];
  professionales: Professional[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
  ) {
    this.filterForm = this.fb.group({
      professional_id: ['', Validators.required],
      date_appointments: ['', Validators.required],
      turno: [''] // mañana, tarde, vacío (todos)
    });
  }

  ngOnInit(): void {
    this.loadProfessionals();

    // Escucha los cambios del select turno
    this.filterForm.get('turno')?.valueChanges.subscribe(() => {
      this.filterByPeriod();
    });
  }

  loadProfessionals() {
    this.appointmentsService.getProfessionals().subscribe(
      data => {
        this.professionales = data;
        console.log('Profesionales cargados:', this.professionales);
      },
      error => {
        this.errorMsg = 'Error cargando profesionales. Intenta de nuevo.';
      }
    );
  }

  getAppointments() {
    this.errorMsg = '';

    if (this.filterForm.invalid) {
      this.errorMsg = 'Por favor, selecciona profesional y fecha.';
      return;
    }

    const { professional_id, date_appointments } = this.filterForm.value;

    this.loading = true;
    this.appointmentsService.getAppointments(professional_id, date_appointments)
      .subscribe({
        next: (res) => {
          this.appointments = res;
          this.filterByPeriod(); // Filtrar por turno después de cargar
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Error cargando reservas. Intenta de nuevo.';
          this.loading = false;
        }
      });
  }

  // Filtrar por turno (mañana / tarde)
  filterByPeriod() {
    const turnoSeleccionado = this.filterForm.value.turno?.trim().toLowerCase();

    if (!turnoSeleccionado) {
      this.appointmentsFiltradas = this.appointments; // Mostrar todos
    } else {
      this.appointmentsFiltradas = this.appointments.filter(app =>
        app.periodo.trim().toLowerCase() === turnoSeleccionado
      );
    }
  }

  // Obtener hora de fin
  getEndTime(startTime: string, duration: number): string {
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes + duration, seconds || 0);
    return startDate.toTimeString().slice(0, 5); // HH:mm
  }
}
