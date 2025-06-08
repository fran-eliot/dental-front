import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Professional } from '../../../model/Professional';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { ListaDisponibilidadesComponent } from "../lista-disponibilidades/lista-disponibilidades.component";
import { SelectorDisponibilidadesComponent } from '../selector-disponibilidades/selector-disponibilidades.component';

@Component({
  selector: 'app-consulta-disponibilidades',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaDisponibilidadesComponent,SelectorDisponibilidadesComponent],
  templateUrl: './consulta-disponibilidades.component.html',
  styleUrl: './consulta-disponibilidades.component.css'
})
export class ConsultaDisponibilidadesComponent  {
  professionalId: number | null = null;
  date: string = '';


  constructor(private professionalService: ProfessionalService) {}

  actualizarConsulta(seleccion: { professionalId: number; date: string }) {
    this.professionalId = seleccion.professionalId;
    this.date = seleccion.date;
  }

}
