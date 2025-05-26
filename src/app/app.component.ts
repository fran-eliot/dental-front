import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NavigationComponent } from './views/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, HomeComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-dental-app';
}
