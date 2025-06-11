import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlLogin:string = "http://localhost:3000/auth/login"

  constructor(private http:HttpClient ) { }

  //Inicio de sesion
  login(credentials: Login): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.urlLogin, credentials, { headers });
  }

  //Cierre de sesion, esta en el componente de navegacion
  logOut(){
    localStorage.removeItem('access_token');
    //localStorage.removeItem('user_role');
  }
}
