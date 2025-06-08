import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Status } from '../../../model/Status';
import { ProfessionalAvailabitity } from './../../../model/ProfessionalAvailability';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-disponibilidades',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './lista-disponibilidades.component.html',
  styleUrl: './lista-disponibilidades.component.css'
})
export class ListaDisponibilidadesComponent implements OnInit, OnChanges {
  @Input() professionalId!: number;
  @Input() date!: string;
  availabilities: ProfessionalAvailabitity[] = [];
  statusValues = Object.values(Status);

   constructor(
    private availabilityService: AvailabitlityService) {}

   ngOnInit(): void {
    // Si los inputs ya están presentes al iniciar
    if (this.professionalId && this.date) {
      this.fetchAvailabilities();
    }
  }

  ngOnChanges(): void {
    // Se llama cada vez que cambia algún @Input
    if (this.professionalId && this.date) {
      this.fetchAvailabilities();
    }
  }

  fetchAvailabilities() {
    this.availabilityService.getAvailabilities(this.professionalId, this.date)
      .subscribe({
        next: (res) => {
          this.availabilities = res;
        },
        error: (err) => console.error('Error obteniendo disponibilidades', err)
      });
  }

  updateStatus(id: number, status: Status) {
    this.availabilityService.updateStatus(id, status)
      .subscribe({
        next: () => {
          const availability = this.availabilities.find(a => a.id === id);
          if (availability) availability.status = status;
          alert('Estado actualizado correctamente');
        },
        error: () => alert('Error al actualizar estado')
      });
  }

  formatHour(time: string): string {
    return time.slice(0, 5); // "09:00:00" => "09:00"
  }


}
