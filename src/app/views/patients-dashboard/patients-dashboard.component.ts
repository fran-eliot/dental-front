import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientsComponent } from '../../components/patients/patients.component';
import { NewPatientsComponent } from '../../components/patients/new-patients/new-patients.component';

@Component({
  selector: 'app-patients-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PatientsComponent, NewPatientsComponent],
  templateUrl: './patients-dashboard.component.html',
  styleUrl: './patients-dashboard.component.css'
})
export class PatientsDashboardComponent {
  selectedTab = 'listado';
}
