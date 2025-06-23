import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../service/appointment/appointments.service';
import { Professional } from '../../model/Professional';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaDisponibilidadesComponent } from '../disponibilidades/lista-disponibilidades/lista-disponibilidades.component';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ListaDisponibilidadesComponent],
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
  showModal = false;
  profesionalIdSeleccionado: number = 0;
  fechaSeleccionada: string = '';

  //Variables para actualizar status y el motivo
  updateForm: FormGroup;
  updateLoading = false;
  updateErrorMsg = '';
  updateSuccessMsg = '';
  showUpdateModal = false;
  selectedAppointmentId: number | null = null;

  //Variables para paginación
  totalAppointments: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

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
    // Formulario para actualizar estado y motivo cancelación
    this.updateForm = this.fb.group({
      status_appointments: ['', Validators.required],
      cancellation_reason_appointments: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfessionals();

    // Cuando cambie turno, reseteamos página y recargamos
    this.filterForm.get('turno')?.valueChanges.subscribe(() => {
      this.filterByPeriod();
    });

    // Cuando cambie paciente, reseteamos página y recargamos
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

  //Para la paginación
  totalPages(): number {
    return Math.ceil(this.totalAppointments / this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage = page;

    const filters = this.filterForm.value;
    filters.page = this.currentPage;
    filters.pageSize = this.pageSize;

    this.getAppointments(filters);
  }

  //Traer las reservas
  getAppointments(filters?: any) {
    this.errorMsg = '';
    this.loading = true;

    if (!filters) {
      filters = this.filterForm.value;
      filters.page = this.currentPage;
      filters.pageSize = this.pageSize;
    }

    this.appointmentsService.getAppointments(filters).subscribe({
      next: (res) => {
        //añade una propiedad isCancelled: true/false a cada reserva, para bloquearla
        this.appointments = res.data.map(app => ({
          ...app,
          isCancelled: app.estado?.toLowerCase() === 'cancelada',
          isCompleted: app.estado?.toLowerCase() === 'realizada',
        }));

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

        // Guarda datos para paginación (si usas)
        this.totalAppointments = res.total;
        this.currentPage = res.page;
        this.pageSize = res.pageSize;

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

  //Abrir modal disponibilidades
  openModalAvailabilities() {
    const profesional = this.filterForm.get('professional_id')?.value;
    const fecha = this.filterForm.get('date_appointments')?.value;

    if (!profesional || !fecha) {
      alert('Por favor selecciona un profesional y una fecha');
      return;
    }

    this.profesionalIdSeleccionado = profesional;
    this.fechaSeleccionada = fecha;
    this.showModal = true;

    }

  closeModalAvailabilities() {
    this.showModal = false;
  }

  // abrir modal para actualizar estado y motivo cancelación
  openUpdateStatusModal(appointment: any) {
    console.log('Objeto appointment recibido:', appointment);

    this.selectedAppointmentId = appointment.id_reserva;
    console.log("id_appointent", this.selectedAppointmentId);

    this.updateForm.patchValue({
      status_appointments: appointment.estado || '',
      cancellation_reason_appointments: appointment.cancellation_reason_appointments || ''
    });

    this.showUpdateModal = true;
  }

  // actualizar estado y motivo cancelación
  updateAppointmentStatus() {
    if (!this.selectedAppointmentId) {
      this.updateErrorMsg = 'No se ha seleccionado una reserva.';
      return;
    }

    if (this.updateForm.invalid) {
      this.updateErrorMsg = 'Por favor, completa el estado.';
      return;
    }

    this.updateLoading = true;
    this.updateErrorMsg = '';
    this.updateSuccessMsg = '';

    this.appointmentsService.updateAppointmentStatus(this.selectedAppointmentId, this.updateForm.value).subscribe({
      next: (res) => {
        this.updateSuccessMsg = 'Reserva actualizada correctamente.';
        this.updateLoading = false;
        this.showUpdateModal = false;

        // Refrescar la lista para ver cambios
        this.getAppointments();
      },
      error: (err) => {
        this.updateErrorMsg = 'Error actualizando la reserva. Intenta de nuevo.';
        this.updateLoading = false;
      }
    });
  }
}
