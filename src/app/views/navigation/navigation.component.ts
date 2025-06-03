import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(
    private loginService:LoginService,
    private readonly router: Router
  ){}

  //Verifica si el usuario esta loggeado
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  //Cierre de sesión
  onlogOut(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
