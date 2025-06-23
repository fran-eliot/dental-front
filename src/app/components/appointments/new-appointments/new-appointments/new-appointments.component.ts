import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';import { CommonModule, formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../../../model/Patient';
import { Professional } from '../../../../model/Professional';
import { Treatment } from '../../../../model/Treatment';
import { Slot } from '../../../../model/Slot';
import { AppointmentsService } from '../../../../service/appointment/appointments.service';
import { Appointment } from '../../../../model/Appoinment';
import { HistoricalAppointmentsModalComponent } from '../../historical-appointments/historical-appointments-modal/historical-appointments-modal.component';
import { NewPatientsComponent } from '../../../patients/new-patients/new-patients.component';

@Component({
  selector: 'app-new-appointments',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NewPatientsComponent],
  templateUrl: './new-appointments.component.html',
  styleUrls: ['./new-appointments.component.css']
})
export class NewAppointmentsComponent implements OnInit {

  appointmentForm!: FormGroup;
  patients: Patient[] = [];
  appointments: Appointment[] = [];
  professionals: Professional[] = [];
  treatments: Treatment[] = [];
  availableSlot: Slot[] = [];
  showDropdown = false;
  patientSearchControl = new FormControl('');
  filteredPatients: Patient[] = [];
  selectedPatient: any;
  historicalData: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showNewPatientModal = false;

  constructor(
    private dialog: MatDialog, //injectar el modal
    private formBuilder: FormBuilder, //el formulario
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFormOptions();
    this.onFormChanges();

  }

  initForm(): void {
    this.appointmentForm = this.formBuilder.group({
      patient_id: ['', Validators.required],
      professional_id: ['', Validators.required],
      treatments_id: ['', Validators.required],
      duration_minutes_appointments: [null, Validators.required],
      slot_id: ['', Validators.required],
      date_appointments: ['', Validators.required],
      status_appointments: ['pendiente', Validators.required],
      cancellation_reason_appointments: [''],
      created_by_appointments: ['admin']
    });
  }

  loadFormOptions(): void {
    this.loadProfessionals();
    this.loadTreatments();
    this.loadPatients();
  }

  loadPatients(): void {
    this.appointmentsService.getPatients().subscribe((data: Patient[]) => {
      console.log('Pacientes recibidos:', data);
      this.patients = data;
      this.filteredPatients = [...this.patients];
    });
  }

  // Filtra la lista de pacientes según el texto buscado
  filterPatients() {
    const term = this.patientSearchControl.value?.toLowerCase().trim() || '';

    if (term.length === 0) {
      this.filteredPatients = [];
      this.showDropdown = false;
      this.selectedPatient = null;
      this.appointmentForm.get('patient_id')?.setValue(null);
      return;
    }

    this.filteredPatients = this.patients.filter(p =>
      (`${p.name_patients} ${p.last_name_patients}`.toLowerCase().includes(term)) ||
      (p.email_patients?.toLowerCase().includes(term))
    );

    this.showDropdown = this.filteredPatients.length > 0;
  }

  // Cuando seleccionas un paciente de la lista filtrada
  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.patientSearchControl.setValue(`${patient.name_patients} ${patient.last_name_patients}`);
    this.filteredPatients = [];
    this.showDropdown = false;
    this.appointmentForm.get('patient_id')?.setValue(patient.id_patients);
  }
  // Para evitar que el blur cierre el dropdown antes que el click
  closeDropdownWithDelay() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  openDropdown() {
    if (this.filteredPatients.length > 0) {
      this.showDropdown = true;
    }
  }

  loadProfessionals(): void {
    this.appointmentsService.getProfessionals().subscribe((data: Professional[]) => {
      this.professionals = data;
    });
  }


  loadTreatments(): void {
    this.appointmentsService.getTreatments().subscribe((data: Treatment[]) => {
      this.treatments = data;
    });
  }

  onFormChanges(): void {
    this.appointmentForm.get('treatments_id')?.valueChanges.subscribe(id => {
      const selected = this.treatments.find(t => t.id_treatments === +id);
      if (selected) {
        this.appointmentForm.get('duration_minutes_appointments')?.setValue(selected.duration_minutes_treatments);
      } else {
        this.appointmentForm.get('duration_minutes_appointments')?.reset();
      }
    });
    this.appointmentForm.get('date_appointments')?.valueChanges.subscribe(() => {
      this.loadAvailableHours();
    });

    this.appointmentForm.get('professional_id')?.valueChanges.subscribe(() => {
      this.loadAvailableHours();
    });
  }

  loadAvailableHours(): void {
    const date = this.appointmentForm.get('date_appointments')?.value;
    const professionalId = this.appointmentForm.get('professional_id')?.value;

    if (date && professionalId) {
      this.appointmentsService.getHorasDisponibles(professionalId, date)
        .subscribe((slots: Slot[]) => {
         this.availableSlot = slots;
      });
    }
  }

  postNewAppointment(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.appointmentForm.valid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const formValue = this.appointmentForm.value;
    const patientId = Number(formValue.patient_id);
    const slotId = Number(formValue.slot_id);
    const formDate = formatDate(formValue.date_appointments, 'yyyy-MM-dd', 'en-ES');

    // 1. Traer todas las reservas para validar
    this.appointmentsService.getAllAppointmentsComplete().subscribe({
      next: (allAppointments) => {
        console.table(allAppointments);
        console.log('Form values:', formValue);
        // 2. Filtrar reservas que coincidan en paciente, fecha y slot
        const existing = allAppointments.find(app =>
          Number(app.patient?.id_patients) === patientId &&
          Number(app.slot?.id) === slotId &&
          formatDate(app.date_appointments, 'yyyy-MM-dd', 'en-ES') === formDate &&
          app.status_appointments.toLowerCase() !== 'cancelada'
        );

        console.log('Resultado del find:', existing);

        if (existing) {
          // 3. Ya existe reserva activa para ese paciente, slot y fecha
          this.errorMessage = 'El paciente ya tiene una reserva en esa fecha y hora.';
          return;
        }

        // 4. Si no existe, crea la reserva
        const newAppointment: Appointment = {
          patient_id: formValue.patient_id,
          professional_id: formValue.professional_id,
          treatments_id: formValue.treatments_id,
          slot_id: formValue.slot_id,
          date_appointments: formValue.date_appointments,
          duration_minutes_appointments: formValue.duration_minutes_appointments,
          status_appointments: formValue.status_appointments?.toLowerCase() || 'pendiente',
          cancellation_reason_appointments: formValue.cancellation_reason_appointments,
          created_by_appointments: formValue.created_by_appointments?.toLowerCase() || 'admin'
        };

        this.appointmentsService.postNewAppointment(newAppointment).subscribe({
          next: () => {
            this.successMessage = '¡Reserva creada correctamente!';
            this.appointmentForm.reset();
            this.patientSearchControl.setValue('');
            this.selectedPatient = null;
            this.filteredPatients = [];
            this.availableSlot = [];
          },
          error: (err) => {
            console.error('Error al crear la reserva:', err);
            this.errorMessage = 'Ocurrió un error al crear la reserva. Revisa el tiempo del tratamiento';
          }
        });
      },
      error: (err) => {
        console.error('Error al traer las reservas:', err);
        this.errorMessage = 'No se pudieron verificar las reservas existentes. Intenta nuevamente.';
      }
    });
  }

  //Para el modal del historico del paciente
  getAllAppointementsByPatient():void{
    if (!this.selectedPatient?.id_patients) return;

    const patientId = this.selectedPatient.id_patients;

    this.appointmentsService.getAllAppointementsByPatient(this.selectedPatient.id_patients)
    .subscribe(data => {
      console.log('Historial recibido:', data);
      this.dialog.open(HistoricalAppointmentsModalComponent, {
        width: '600px',
        data
      });
    });
  }
  //para el modal del nuevo paciente
  openNewPatientModal(): void {
    this.showNewPatientModal = true;
  }
  closeNewPatientModal(): void {
    this.showNewPatientModal = false;
  }
  handleNewPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.appointmentForm.patchValue({ patient_id: patient.id_patients });
    this.patientSearchControl.setValue(`${patient.name_patients} ${patient.last_name_patients}`);
    this.closeNewPatientModal();
  }
}
