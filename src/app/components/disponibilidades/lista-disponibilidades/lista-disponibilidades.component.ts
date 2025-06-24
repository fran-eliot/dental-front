import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Status } from '../../../model/Status';
import { ProfessionalAvailabitity } from './../../../model/ProfessionalAvailability';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { Professional } from '../../../model/Professional';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-lista-disponibilidades',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatProgressSpinnerModule],
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
  loading:boolean = false; // Variable para controlar el estado de carga

   constructor(
    private availabilityService: AvailabitlityService,
    private professionalService: ProfessionalService,
    private snackBar: MatSnackBar
  ) {}

   ngOnInit(): void {
    // Si los inputs ya están presentes al iniciar
    if (this.professionalId && this.date) {
      this.fetchAvailabilities();
    }

    // Cargar lista de profesionales
    this.professionalService.getActiveProfessionals().subscribe({
      next: (res) => {
        this.professionals = res;
        console.log('Profesionales recibidos:', this.professionals);
        this.fetchProfessionalNameFromList(); // Buscar nombre cuando ya los tengo
      },
      error: (err) => {
        console.error('Error al obtener profesionales', err);
        this.snackBar.open('Error al obtener la lista de profesionales', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
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
    this.loading = true; // Iniciar carga
    this.availabilityService.getAvailabilities(this.professionalId, this.date)
      .subscribe({
        next: (res) => {
          this.availabilities = res;
          this.loading = false; // Finalizar carga
        },
        error: (err) => {
          this.loading = false; // Finalizar carga incluso si hay error
          console.error('Error obteniendo disponibilidades', err);
          this.snackBar.open('Error al obtener disponibilidades', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
  }

  updateStatus(id: number, status: Status) {
    this.availabilityService.updateStatus(id, status).subscribe({
      next: () => {
        const availability = this.availabilities.find(a => a.id === id);
        if (availability) availability.status = status;

        this.snackBar.open('Estado actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: () => {
        this.snackBar.open('Error al actualizar estado', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
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
