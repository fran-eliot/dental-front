import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-preview',
  standalone: true,
  imports: [],
  templateUrl: './consulta-preview.component.html',
  styleUrl: './consulta-preview.component.css'
})
export class ConsultaPreviewComponent {

  constructor(private router: Router) {}

  irAConsulta() {
    this.router.navigate(['/admin/dashboard/disponibilidades/consulta']);
  }

}
