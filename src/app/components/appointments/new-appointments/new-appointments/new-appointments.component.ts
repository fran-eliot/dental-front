import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../../../service/appointment/appointments.service';
import { Patient } from '../../../../model/Patient';
import { Treatment } from '../../../../model/Treatment';
import { Professional} from '../../../../model/Professional';
import { Appointment} from '../../../../model/Appoinment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessionalAvailabitity } from '../../../../model/ProfessionalAvailability';
import { Slot } from '../../../../model/Slot';
import { MatDialog } from '@angular/material/dialog';
import { HistoricalAppointmentsModalComponent } from '../../historical-appointments/historical-appointments-modal/historical-appointments-modal.component';


@Component({
  selector: 'app-new-appointments',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './new-appointments.component.html',
  styleUrls: ['./new-appointments.component.css']
})
export class NewAppointmentsComponent implements OnInit {

  appointmentForm!: FormGroup;
  patients: Patient[] = [];
  professionals: Professional[] = [];
  treatments: Treatment[] = [];
  availableSlot: Slot[] = [];
  showDropdown = false;
  patientSearchControl = new FormControl('');
  filteredPatients: any[] = [];
  selectedPatient: any;
  historicalData: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private dialog: MatDialog, //injectar el modal
    private formBuilder: FormBuilder, //el formulario
    private appointmentService: AppointmentsService
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
      //time_appointments: ['', Validators.required],
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
    this.appointmentService.getPatients().subscribe((data: Patient[]) => {
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
      (`${p.name_patients} ${p.last_name_patients}`).toLowerCase().includes(term)
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
    this.appointmentService.getProfessionals().subscribe((data: Professional[]) => {
      this.professionals = data;
    });
  }


  loadTreatments(): void {
    this.appointmentService.getTreatments().subscribe((data: Treatment[]) => {
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
      this.appointmentService.getHorasDisponibles(professionalId, date)
        .subscribe((slots: Slot[]) => {
         this.availableSlot = slots;
      });
    }
  }

  postNewAppointment(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;

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

      this.appointmentService.postNewAppointment(newAppointment).subscribe({
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
          this.errorMessage = 'Ocurrió un error al crear la reserva. Intenta nuevamente.';
        }
      });

    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
  //Para el modal del historico del paciente
  getAllAppointementsByPatient():void{
    if (!this.selectedPatient?.id_patients) return;

    const patientId = this.selectedPatient.id_patients;

    this.appointmentService.getAllAppointementsByPatient(this.selectedPatient.id_patients)
    .subscribe(data => {
      console.log('Historial recibido:', data);
      this.dialog.open(HistoricalAppointmentsModalComponent, {
        width: '600px',
        data
      });
    });
  }
}
