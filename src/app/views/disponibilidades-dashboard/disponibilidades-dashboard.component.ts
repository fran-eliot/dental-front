import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneradorDisponibilidadesComponent } from '../../components/disponibilidades/generador-disponibilidades/generador-disponibilidades.component';
import { LimpiezaDisponibilidadesComponent } from '../../components/disponibilidades/limpieza-disponibilidades/limpieza-disponibilidades.component';
import { ConsultaPreviewComponent } from '../../components/disponibilidades/consulta-preview/consulta-preview.component';
import { SlotsLibresPreviewComponent } from "../../components/disponibilidades/slots-libres-preview/slots-libres-preview.component";
import { DisponibilidadesMensualesComponent } from '../../components/disponibilidades/disponibilidades-mensuales/disponibilidades-mensuales.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SlotsLibresComponent } from '../../components/disponibilidades/slots-libres/slots-libres.component';
import { ConsultaDisponibilidadesComponent } from '../../components/disponibilidades/consulta-disponibilidades/consulta-disponibilidades.component';

@Component({
  selector: 'app-disponibilidades-dashboard',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    MatTabsModule,
    DisponibilidadesMensualesComponent,
    GeneradorDisponibilidadesComponent,
    LimpiezaDisponibilidadesComponent,
    ConsultaPreviewComponent, SlotsLibresComponent, ConsultaDisponibilidadesComponent],
  templateUrl: './disponibilidades-dashboard.component.html',
  styleUrl: './disponibilidades-dashboard.component.css'
})
export class DisponibilidadesDashboardComponent {
  selectedTab = 'generarDisponibilidades';
  professionalId: number | null = null;
  date: string | null = null;

  onDisponibilidadesSeleccionadas(event: { professionalId: number, date: string }) {
    this.professionalId = event.professionalId;
    this.date = event.date;
  }

}
