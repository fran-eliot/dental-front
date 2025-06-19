import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../model/Patient';
import { PatientService } from '../../../service/patient/patient.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-patients',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-patients.component.html',
  styleUrl: './new-patients.component.css'
})
export class NewPatientsComponent implements OnInit {
  @Output() patientCreated = new EventEmitter<Patient>();
  @Output() cancel = new EventEmitter<void>();

  newPatientForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
  ) {}

  ngOnInit(): void {
    this.newPatientForm = this.fb.group({
      nif_patients: [''],
      name_patients: ['', Validators.required],
      last_name_patients: ['', Validators.required],
      phone_patients: ['', Validators.required],
      email_patients: ['', [Validators.required, Validators.email]],
      is_active_patients: [true]
    });
  }

  //Para crear nuevo paciente
  submitNewPatient(): void {
    if (this.newPatientForm.invalid) return;

    const patient: any = this.newPatientForm.value;

    // Validar NIF si está presente
    if (patient.nif_patients) {
      const nifRegex = /^[0-9]{8}[A-Z]$/;
      if (!nifRegex.test(patient.nif_patients)) {
        this.errorMessage = 'NIF inválido. Debe tener 8 números seguidos de una letra mayúscula.';
        this.successMessage = '';
        return;
      }
    }
    // Validar teléfono si está presente
    if (patient.phone_patients) {
      const phoneRegex = /^[6789]\d{8}$/;
      if (!phoneRegex.test(patient.phone_patients)) {
        this.errorMessage = 'Teléfono inválido. Debe tener 9 dígitos y comenzar por 6, 7, 8 o 9.';
        this.successMessage = '';
        return;
      }
    }

    // Limpiar campos vacíos o nulos
    Object.keys(patient).forEach(key => {
      if (patient[key] === '' || patient[key] === null || patient[key] === undefined) {
        delete patient[key];
      }
    });

    this.patientService.createPatient(patient).subscribe({
      next: (response) => {
        this.successMessage = 'Paciente creado correctamente.';
        this.errorMessage = '';
        this.newPatientForm.reset({ is_active_patients: true });
        this.patientCreated.emit(response);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear paciente.';
        this.successMessage = '';
        console.error('Error creating patient:', error);
      }
    });
  }

    /*createPatient(patient:Patient): void {
      this.patientService.createPatient(patient).subscribe({
        next: (response) => {
          console.log('Patient created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating patient:', error);
        }
      });
    }*/
}
