import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dentist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentist-dashboard.component.html',
  styleUrl: './dentist-dashboard.component.css'
})

export class DentistDashboardComponent implements OnInit {
  dentistName = 'Nombre Apellido'; // Puedes reemplazar con datos reales del usuario logueado
  today = new Date();

  todaysAppointments = [
    // Estos datos se cargarán realmente desde el backend
    { time: '09:30', patientName: 'Ana Gómez' },
    { time: '11:00', patientName: 'Luis Martínez' },
    { time: '16:00', patientName: 'Carla Pérez' },
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí se podría hacer la llamada al servicio para obtener las citas del día
  }
}
