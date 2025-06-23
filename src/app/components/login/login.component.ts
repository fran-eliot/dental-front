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
  credentials: Login = { username_users: '', password_users: '', rol_users:'', is_active_users:true };
  errorMessage: string = '';

  constructor (
    private readonly loginService:LoginService,
    private readonly router: Router
  ){}

  //Inicio de sesion
  login(): void {
    if (!this.credentials.username_users || !this.credentials.password_users) {
      this.errorMessage = 'Debes completar ambos campos.';
    return;
    }
    this.loginService.login(this.credentials).subscribe({
      next: (data) => {
        const token = data.access_token;
        const rol = data.user.rol;
        const userId = data.user.id;
        const userName = data.user.username_users;

        //me guarda el token de acceso de sesion desde el back y tb el role
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('user_name', userName);

        //Depende del role me redirige a una ruta u otra
        switch (rol) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'dentista':
            this.router.navigate(['/dentista']);
            break;
          default:
            this.router.navigate(['']); // ruta por defecto
        }
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Ha ocurrido un error inesperado.';
        }
        console.error(err);
      },
    });
  }
}
