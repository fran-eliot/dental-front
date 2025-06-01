import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  

  constructor(
    private loginService:LoginService,
    private readonly router: Router
  ){}

  //Cierre de sesión
  onlogOut(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
