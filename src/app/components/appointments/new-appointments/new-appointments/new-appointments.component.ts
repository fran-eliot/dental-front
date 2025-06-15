import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsService } from '../../../../service/appointment/appointments.service';

@Component({
  selector: 'app-new-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './new-appointments.component.html',
  styleUrl: './new-appointments.component.css'
})
export class NewAppointmentsComponent implements OnInit {
  form!: FormGroup;
  horasDisponibles: string[] = [];
  pacientes: any[] = [];
  profesionales: any[] = [];
  tratamientos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      patient_id: [''],
      professional_id: [''],
      treatments_id: [''],
      date_appointments: [''],
      time_appointments: [''],
      status_reservas: ['confirmada']
    });

    this.form.get('date_appointments')?.valueChanges.subscribe(() => this.loadHorasDisponibles());
    this.form.get('professional_id')?.valueChanges.subscribe(() => this.loadHorasDisponibles());
  }

  loadHorasDisponibles() {
    const fecha = this.form.get('date_appointments')?.value;
    const profesionalId = this.form.get('professional_id')?.value;

    if (fecha && profesionalId) {
      this.appointmentsService.getHorasDisponibles(fecha, profesionalId)
        .subscribe(horas => this.horasDisponibles = horas);
        console.log("Horas disponibles", this.horasDisponibles);
    }
  }
}
