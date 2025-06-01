import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-professionals',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.css'
})
export class ProfessionalsComponent {

  constructor(private router: Router){}

  goTo(ruta: string) {
    this.router.navigate([`/dentistas/${ruta}`]);
  }

}
