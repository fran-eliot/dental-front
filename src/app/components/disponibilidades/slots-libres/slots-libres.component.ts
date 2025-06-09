import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slots-libres',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './slots-libres.component.html',
  styleUrl: './slots-libres.component.css'
})

export class SlotsLibresComponent implements OnInit {
  professionals: any[] = [];
  selectedProfessional: number=0;
  selectedDate: string = '';
  slots: any[] | null = null;
  filtroPeriodo: string = 'todos';

  constructor(
    private avalabilitiesService: AvailabitlityService,
    private professionalService: ProfessionalService
  ) {}

  ngOnInit() {
    this.professionalService.getProfessionals().subscribe((data) => {
      this.professionals = data;
    });
  }

  buscarSlotsLibres() {
    if (!this.selectedProfessional || !this.selectedDate) return;

    this.avalabilitiesService.getFreeSlots(this.selectedProfessional, this.selectedDate).subscribe(
      (data) => {
        this.slots = data;
      },
      (error) => {
        console.error('Error al obtener los slots', error);
        this.slots = [];
      }
    );
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
