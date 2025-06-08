import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneradorDisponibilidadesComponent } from '../../components/disponibilidades/generador-disponibilidades/generador-disponibilidades.component';
import { LimpiezaDisponibilidadesComponent } from '../../components/disponibilidades/limpieza-disponibilidades/limpieza-disponibilidades.component';
import { ConsultaDisponibilidadesComponent } from '../../components/disponibilidades/consulta-disponibilidades/consulta-disponibilidades.component';
import { ConsultaPreviewComponent } from '../../components/disponibilidades/consulta-preview/consulta-preview.component';

@Component({
  selector: 'app-disponibilidades-dashboard',
  standalone: true,
  imports: [RouterModule,
    GeneradorDisponibilidadesComponent,
    LimpiezaDisponibilidadesComponent,
    ConsultaPreviewComponent],
  templateUrl: './disponibilidades-dashboard.component.html',
  styleUrl: './disponibilidades-dashboard.component.css'
})
export class DisponibilidadesDashboardComponent {
  professionalId: number | null = null;
  date: string | null = null;

  onDisponibilidadesSeleccionadas(event: { professionalId: number, date: string }) {
    this.professionalId = event.professionalId;
    this.date = event.date;
  }

}
