import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../model/Login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  urlRegisterUser: string = "http://localhost:3000/users/alta";
  urlUsers: string = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  registerNewUser(credentials: Login): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.urlRegisterUser, credentials, {headers})
  }
  //Me traigo los roles de la bbdd
  getRoles(): Observable<string[]> {
    return this.http.get<Login[]>(this.urlUsers).pipe(
      map((users: Login[]) => [...new Set(users.map(rol => rol.rol_users))])
    );

  }

}
