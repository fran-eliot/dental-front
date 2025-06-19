import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Status } from '../../../model/Status';
import { ProfessionalAvailabitity } from './../../../model/ProfessionalAvailability';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { Professional } from '../../../model/Professional';

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
  filtroPeriodo: string = 'todos';
  filtroEstado: string = 'todos';
  professionalName: string = '';
  professionals: Professional[] = [];
  nombreProfesional: string = '';

   constructor(
    private availabilityService: AvailabitlityService,
    private professionalService: ProfessionalService
  ) {}

   ngOnInit(): void {
    // Si los inputs ya están presentes al iniciar
    if (this.professionalId && this.date) {
      this.fetchAvailabilities();
    }
    // Cargar lista de profesionales
    this.professionalService.getProfessionals().subscribe({
      next: (res) => {
        this.professionals = res;
        console.log('Profesionales recibidos:', this.professionals);
        this.fetchProfessionalNameFromList(); // Buscar nombre cuando ya los tengo
      },
      error: (err) => console.error('Error al obtener profesionales', err)
    });
    console.log('professionalId recibido:', this.professionalId);
  }

  ngOnChanges(): void {
    // Se llama cada vez que cambia algún @Input
    if (this.professionalId && this.date) {
      this.fetchAvailabilities();

    }
  }
  fetchProfessionalNameFromList() {
    const prof = this.professionals.find(p => +p.id_professionals === +this.professionalId);
    if (prof) {
      this.nombreProfesional = `${prof.name_professionals} ${prof.last_name_professionals}`;
    } else {
      this.nombreProfesional = 'Profesional no encontrado';
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

  filtrarDisponibilidades() {
    return this.availabilities.filter(a => {
      const coincidePeriodo =
        this.filtroPeriodo === 'todos' ||
        a.slot.period.toLowerCase() === this.filtroPeriodo.toLowerCase();

      const coincideEstado =
        this.filtroEstado === 'todos' ||
        a.status.toLowerCase() === this.filtroEstado.toLowerCase();

      return coincidePeriodo && coincideEstado;
    });
  }
  getEstadoClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'libre':
        return 'estado-libre';
      case 'reservado':
        return 'estado-reservado';
      case 'no disponible':
        return 'estado-no-disponible';
      default:
        return '';
    }
  }
}
