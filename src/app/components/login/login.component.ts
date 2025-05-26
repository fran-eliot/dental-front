import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { Login } from '../../model/Login';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: Login = { username_users: '', password_users: '' };
  errorMessage: string = '';


  constructor (
    private readonly loginService:LoginService,
    private readonly router: Router
  ){}

  login(): void {
    console.log("Acceso Login", this.credentials);
    this.loginService.login(this.credentials).subscribe({
      next: (data) => {
        const token = data.access_token;
        //me guarda el token de acceso de sesion desde el back
        localStorage.setItem('access_token', token);
        //Añado desde aqui la ruta si el acceso es valido y me devuelve un token
        this.router.navigate(['/availabilities']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error(err);
      },
    });
  }
}
