import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlGlobal:string = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  //Traigo todos los usuarios
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.urlGlobal);
  }

  //Actualizar la contraseña
  updatePassword(id_users:number, newPassword:string): Observable<User>{
    return this.http.patch<User>(`${this.urlGlobal}/${id_users}/update_password`,
      {password_users: newPassword});
  }

  //Actualizamos el status
  updateStatus(id_users: number, newStatus: boolean): Observable<User> {
    return this.http.patch<User>(`${this.urlGlobal}/${id_users}/toggle_status`, { is_active_users: newStatus });
  }

  //Actualizar rol
  updateRol(id_users:number, newRol:string):Observable<User>{
    return this.http.patch<User>(`${this.urlGlobal}/${id_users}/rol_users`, {rol_users:newRol});
  }

  //Actualizar username
  updateUsername(id_users:number, newUsername:string):Observable<User>{
    return this.http.patch<User>(`${this.urlGlobal}/${id_users}/username`, {username_users:newUsername});
  }
}

