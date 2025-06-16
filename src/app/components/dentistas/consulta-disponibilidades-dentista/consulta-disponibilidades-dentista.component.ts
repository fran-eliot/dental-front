import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-consulta-disponibilidades-dentista',
  standalone: true,
  imports: [],
  templateUrl: './consulta-disponibilidades-dentista.component.html',
  styleUrl: './consulta-disponibilidades-dentista.component.css'
})

export class ConsultaDisponibilidadesDentistaComponent implements OnInit {
  disponibilidades: any[] = [];
  error = '';
  filtroPeriodo = 'todos';
  loading = true;

  constructor(private availabilityService: AvailabilityService) {}

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  cargarDisponibilidades(): void {
    this.availabilityService.getDisponibilidadesPropias().subscribe({
      next: (data) => {
        this.disponibilidades = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las disponibilidades.';
        this.loading = false;
      }
    });
  }

  filtrarDisponibilidades() {
    if (this.filtroPeriodo === 'todos') return this.disponibilidades;
    return this.disponibilidades.filter(d => d.slot.period.toLowerCase() === this.filtroPeriodo);
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}
