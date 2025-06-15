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
      turno: [''], // mañana, tarde, vacío (todos)
      patient_name: [''],
      status_appointments: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfessionals();

    // Escucha los cambios del select turno
    this.filterForm.get('turno')?.valueChanges.subscribe(() => {
      this.filterByPeriod();
    });

    //Escucha los cambios del patient
    this.filterForm.get('patient_name')?.valueChanges.subscribe(() => {
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

    const filters = this.filterForm.value;

    this.loading = true;
    this.appointmentsService.getAppointments(filters).subscribe({
      next: (res) => {
        this.appointments = res;

        // Aplicar filtro local por paciente si existe
        const pacienteFiltro = filters.patient_name?.toLowerCase().trim();
        if (pacienteFiltro) {
          this.appointmentsFiltradas = this.appointments.filter(app =>
            app.paciente.toLowerCase().includes(pacienteFiltro)
          );
        } else {
          this.appointmentsFiltradas = this.appointments;
        }

        // Luego filtrar por turno si quieres
        this.filterByPeriod();

        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error cargando reservas. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  // Filtrar por turno (mañana / tarde) y por patient
  filterByPeriod() {
    const turnoSeleccionado = this.filterForm.value.turno?.trim().toLowerCase();
    const patientNameFilter = this.filterForm.value.patient_name?.trim().toLowerCase();
    const statusSeleccionated = this.filterForm.value.status_appointments?.trim().toLowerCase();

    this.appointmentsFiltradas = this.appointments.filter(app => {
      const matchTurno = !turnoSeleccionado || app.periodo?.toLowerCase() === turnoSeleccionado;
      const matchPatient = !patientNameFilter || app.paciente?.toLowerCase().includes(patientNameFilter);
      const matchStatus = !statusSeleccionated || app.estado?.toLowerCase() === statusSeleccionated;
      console.log("Paciente Buscaddo", matchPatient);
      return matchTurno && matchPatient && matchStatus;
    });
  }

  // Obtener hora de fin
  getEndTime(startTime: string, duration: number): string {
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes + duration, seconds || 0);
    return startDate.toTimeString().slice(0, 5); // HH:mm
  }

  //par mostrar el detalle de las reservas
  toggleDetalle(app: any) {
    app.mostrarDetalle = !app.mostrarDetalle;
  }
}
