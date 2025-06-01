import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../model/Login';
import { RegisterService } from '../../../service/register/register.service';
import { CommonModule } from '@angular/common';
import { Professional } from '../../../model/Professional';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  credentials: Login = { username_users: '', password_users: '', rol_users:'' };
  professional = new Professional();
  messageRegister = "";
  errorRegister = "";
  roles: string[] = [];
  currentStep = 1; //Empezamos con el paso 1/2

  constructor( private registerService: RegisterService){}

  ngOnInit(): void {
    this.registerService.getRoles().subscribe(
      rolesData =>{
        this.roles = rolesData;
        console.log("Roles", this.roles);
      });
  }

  resetForm(){
    this.credentials = {
      username_users: '',
      password_users: '',
      rol_users: ''
    }
  };

  registerNewUser():void{
    this.registerService.registerNewUser(this.credentials).subscribe(
      response => {
      this.messageRegister = "Usuario agregado correctamente";
      this.errorRegister = "";
      this.professional = new Professional();
      this.professional.user_id = response.id_users;
      this.professional.email_professionals = this.credentials.username_users;

      this.currentStep = 2; //Pasamos al paso 2/2
      this.resetForm();
    },
    error => {
      const backendMessage = error?.error?.message || 'Error al registrar usuario';
      this.errorRegister = backendMessage;
      this.messageRegister = '';
    });
  }
}
