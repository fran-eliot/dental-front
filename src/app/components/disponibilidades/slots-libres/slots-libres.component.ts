import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Professional } from '../../../model/Professional';
import { Slot } from '../../../model/Slot';

@Component({
  selector: 'app-slots-libres',
  standalone: true,
  imports: [CommonModule ,FormsModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './slots-libres.component.html',
  styleUrl: './slots-libres.component.css'
})

export class SlotsLibresComponent implements OnInit {
  professionals: Professional[] = [];
  selectedProfessional: number=0;
  selectedDate: string = '';
  slots: Slot[] | null = null;
  filtroPeriodo: string = 'todos';
  loading: boolean = false;

  constructor(
    private avalabilitiesService: AvailabitlityService,
    private professionalService: ProfessionalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.professionalService.getActiveProfessionals().subscribe((data) => {
      this.professionals = data;
    });
  }

  buscarSlotsLibres() {
    if (!this.selectedProfessional || !this.selectedDate) return;

    this.loading = true;
    this.avalabilitiesService.getFreeSlots(this.selectedProfessional, this.selectedDate).subscribe({
      next: (data) => {
        this.slots = data;
        this.snackBar.open('Slots cargados correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.loading = false;
      },
      error: (error) => {
        this.slots = [];
        this.snackBar.open('Error al obtener los slots.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.loading = false;
        console.error(error);
      }
    });
  }

  formatHour(time: string): string {
    return time.slice(0, 5); // "09:00:00" => "09:00"
  }

  filtrarSlots() {
    if (!this.slots) return [];

    if (!this.filtroPeriodo || this.filtroPeriodo.toLocaleLowerCase() === 'todos') {
      return this.slots;
    }

    return this.slots.filter(
      s => s.period.toLowerCase() === this.filtroPeriodo.toLowerCase()
    );
  }
}
