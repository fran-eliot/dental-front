import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-professionals',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.css'
})
export class ProfessionalsComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  goTo(ruta: string) {
    this.router.navigate([ruta], { relativeTo: this.route });
  }

}
