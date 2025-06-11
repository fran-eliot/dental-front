import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slots-libres-preview',
  standalone: true,
  imports: [],
  templateUrl: './slots-libres-preview.component.html',
  styleUrl: './slots-libres-preview.component.css'
})
export class SlotsLibresPreviewComponent {

  constructor(private router: Router) {}

  irAConsulta() {
    this.router.navigate(['/admin/dashboard/slots-libres/consulta']);
  }

}
