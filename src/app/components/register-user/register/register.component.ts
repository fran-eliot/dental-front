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
  credentials: Login = { username_users: "", password_users: "", rol_users:"", is_active_users:true};
  professional = new Professional();
  messageRegister = "";
  errorRegister = "";
  messageNewProfessional ="";
  errorNewProfessional = "";
  roles: string[] = [];
  currentStep = 1; //Empezamos con el paso 1/2
  //para desactivar el formulario del profesional
  formDisabled: boolean = false;

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
      username_users: "",
      password_users: "",
      rol_users: "",
      is_active_users: true
    }

  };

  //Rgistrar nuevo usuario paso 1/2
  registerNewUser():void{
    this.registerService.registerNewUser(this.credentials).subscribe(
      response => {
      this.messageRegister = "Usuario agregado correctamente";
      this.errorRegister = "";
      this.professional = new Professional();
      this.professional.user_id = response.id_users;
      this.professional.email_professionals = this.credentials.username_users;
      this.professional.is_active_professionals = true;
      this.formDisabled = true;
      this.currentStep = 2; //Pasamos al paso 2/2
      this.resetForm();
    },
    error => {
      const backendMessage = error?.error?.message || "Error al registrar el usuario";
      this.errorRegister = backendMessage;
      this.messageRegister = '';
    });
  }
  resetDataProfessional(){
    this.professional.nif_professionals = "";
    this.professional.license_number_professionals="";
    this.professional.name_professionals = "";
    this.professional.last_name_professionals = "";
    this.professional.phone_professionals = "";
    this.professional.email_professionals = "";
  }

  //Crear el profesional paso 2/2
  newProfessional():void{
    console.log("Datos dentista", this.professional);
    this.registerService.newProfessional(this.professional).subscribe(
      response =>{
        this.messageNewProfessional = "Profesional creado correctamente";
        this.errorNewProfessional = "";
        this.resetDataProfessional();
        this.formDisabled = true;

      },
      error =>{
        const backendMessage = error?.error?.message || "Error al crear el profesional";
        this.errorNewProfessional = backendMessage;
        this.messageNewProfessional = "";
      }
    )
  }
}
