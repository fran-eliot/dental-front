export class Professional{
  id_professionals: number;
  user_id:number;
  nif_professionals: string;
  license_number_professionals: string;
  name_professionals: string;
  last_name_professionals : string;
  phone_professionals:string;
  email_professionals:string;
  assigned_room_professionals: string;
  is_active_professionals: boolean;

  constructor(id_professionals?: number, user_id?:number, nif_professionals?: string, license_number_professionals?: string, name_professionals?: string, last_name_professionals?: string, phone_professionals?: string, email_professionals?: string, assigned_room_professionals?: string, is_active_professionals?: boolean) {
    this.id_professionals = id_professionals;
    this.user_id = user_id;
    this.nif_professionals = nif_professionals || '';
    this.license_number_professionals = license_number_professionals || '';
    this.name_professionals = name_professionals || '';
    this.last_name_professionals = last_name_professionals || '';
    this.phone_professionals = phone_professionals || '';
    this.email_professionals = email_professionals || '';
    this.assigned_room_professionals = assigned_room_professionals || '';
    this.is_active_professionals = is_active_professionals || true;
  }
}
