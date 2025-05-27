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
  credentials: Login = { username_users: '', password_users: '', rol_users:'' };
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
        const rol = data.user.rol;

        //me guarda el token de acceso de sesion desde el back y tb el role
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_role', rol);

        //Depende del role me redirige a una ruta u otra
        switch (rol) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'dentista':
            this.router.navigate(['']);
            break;
          default:
            this.router.navigate(['']); // ruta por defecto
        }
      },
      error: (err) => {
        this.errorMessage = 'Usuario o contraseña incorrecta';
        console.error(err);
      },
    });
  }
}
