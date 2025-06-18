import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dentista-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dentista-layout.component.html',
  styleUrl: './dentista-layout.component.css'
})
export class DentistaLayoutComponent {

}
