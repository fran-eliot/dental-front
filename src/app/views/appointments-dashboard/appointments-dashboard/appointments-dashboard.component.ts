import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsComponent } from '../../../components/appointments/appointments.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-appointments-dashboard',
  standalone: true,
  imports: [CommonModule,AppointmentsComponent, MatTabsModule],
  templateUrl: './appointments-dashboard.component.html',
  styleUrl: './appointments-dashboard.component.css'
})
export class AppointmentsDashboardComponent {
  selectedTab = 'listado';
}
