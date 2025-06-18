import { Component } from '@angular/core';
import { Patient } from '../../model/Patient';
import { PatientService } from './../../service/patient/patient.service';

@Component({
  selector: 'app-patients',
  imports: [],
  standalone: true,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

  constructor( private readonly patientService:PatientService) {}


    // Initialization logic can go here
    //crear patients
  createPatient(patient:Patient): void {
    this.patientService.createPatient(patient).subscribe({
      next: (response) => {
        console.log('Patient created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating patient:', error);
      }
    });
  }

  update(id_patient: number, patient: Patient): void {
    this.patientService.updatePatient(id_patient, patient).subscribe({
      next: (response) => {
        console.log('Patient updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating patient:', error);
      }
    });
  }

  getAll(): void {
    this.patientService.getPatients().subscribe({
      next: (patients: Patient[]) => {
        console.log('Patients retrieved successfully:', patients);
      },
      error: (error) => {
        console.error('Error retrieving patients:', error);
      }
    });


  }



}

