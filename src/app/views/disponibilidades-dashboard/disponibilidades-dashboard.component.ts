import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneradorDisponibilidadesComponent } from '../../components/disponibilidades/generador-disponibilidades/generador-disponibilidades.component';
import { LimpiezaDisponibilidadesComponent } from '../../components/disponibilidades/limpieza-disponibilidades/limpieza-disponibilidades.component';
import { ConsultaPreviewComponent } from '../../components/disponibilidades/consulta-preview/consulta-preview.component';
import { SlotsLibresPreviewComponent } from "../../components/disponibilidades/slots-libres-preview/slots-libres-preview.component";

@Component({
  selector: 'app-disponibilidades-dashboard',
  standalone: true,
  imports: [RouterModule,
    GeneradorDisponibilidadesComponent,
    LimpiezaDisponibilidadesComponent,
    ConsultaPreviewComponent, SlotsLibresPreviewComponent],
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
