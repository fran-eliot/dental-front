export class User{
  id_users:number;
  username_users:string;
  password_users?: string;
  rol_users:string;
  is_active_users:boolean;

  constructor(id_users:number, username:string, password_users:string, rol_users:string, is_active_users:boolean){
    this.id_users = id_users;
    this.username_users = username;
    this.password_users = password_users;
    this.rol_users = rol_users;
    this.is_active_users = is_active_users;
  }
}
