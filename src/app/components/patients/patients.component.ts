import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { PatientService } from '../../service/patient/patient.service';
import { Patient } from '../../model/Patient';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppointmentsService } from '../../service/appointment/appointments.service';
import { HistoricalAppointmentsModalComponent } from '../appointments/historical-appointments/historical-appointments-modal/historical-appointments-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  searchControl = new FormControl('');
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  showDropdown = false;
  loading = false;
  isEditing = false;
  editPatientData: any = null;
  errorMessage: string | null = null;

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => {
        const trimmedTerm = term?.trim() || '';
        if (trimmedTerm.length > 0) {
          this.errorMessage = null;
          this.loadPatients(trimmedTerm);
        } else {
          this.filteredPatients = [];
          this.selectedPatient = null;
          this.showDropdown = false;
          this.errorMessage = 'Por favor, introduce nombre, apellido o email para buscar.';
        }
      });
  }

  loadPatients(searchTerm: string) {
    this.loading = true;
    this.patientService.searchPatients(searchTerm).subscribe({
      next: (resp: Patient[]) => {
        this.patients = resp;
        this.filteredPatients = resp;
        this.loading = false;
        this.showDropdown = this.filteredPatients.length > 0;
      },
      error: () => {
        this.loading = false;
        this.filteredPatients = [];
        this.showDropdown = false;
      }
    });
  }

  closeDropdownWithDelay() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onFocus() {
    this.showDropdown = this.filteredPatients.length > 0;
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.searchControl.setValue(`${patient.name_patients} ${patient.last_name_patients}`, { emitEvent: false });
    this.showDropdown = false;
    this.errorMessage = null;
  }

  startEditing() {
    this.isEditing = true;
    this.editPatientData = { ...this.selectedPatient };
  }

  submitUpdate() {
    if (!this.selectedPatient) return;
    this.patientService.updatePatient(this.selectedPatient.id_patients, this.editPatientData)
      .subscribe({
        next: (response) => {
          console.log('Paciente actualizado correctamente:', response);
          this.selectedPatient = { ...this.editPatientData };
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error al actualizar paciente:', error);
        }
      });
  }
  cancelEditing() {
    this.isEditing = false;
    this.editPatientData = null;
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
}
