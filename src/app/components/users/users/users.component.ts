import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { User } from '../../../model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newPassword: string = '';
  editActiveIndex: number | null = null;
  editRolIndex: number | null = null;
  editUsernameIndex: number |null = null;
  editPasswordIndex: number | null = null;
  passwordUpdateSuccessIndex: number | null = null;
  successMessage: string = '';
  isLoadingPassword: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  enableEditActive(index: number): void {
    this.editActiveIndex = index;
  }

  enableEditPassword(index: number): void {
    this.editPasswordIndex = index;
    this.newPassword = '';
    this.passwordUpdateSuccessIndex = null;
  }

  updateIsActive(user: User, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newStatus = input.checked;

    this.userService.updateStatus(user.id_users, newStatus).subscribe({
      next: (updatedUser) => {
        user.is_active_users = updatedUser.is_active_users;
        this.editActiveIndex = null;
      },
      error: (err) => {
        console.error('Error al actualizar estado activo:', err);
      }
    });
  }

  updatePassword(index: number, user: User): void {
    if (!this.newPassword.trim()) return;

    this.isLoadingPassword = true;

    this.userService.updatePassword(user.id_users, this.newPassword).subscribe({
      next: () => {
        this.isLoadingPassword = false;
        this.passwordUpdateSuccessIndex = index;
        this.successMessage = 'Contraseña actualizada';
        this.newPassword = '';
        this.editPasswordIndex = null;

        setTimeout(() => {
          this.passwordUpdateSuccessIndex = null;
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.isLoadingPassword = false;
        console.error('Error al actualizar contraseña:', err);
      }
    });
  }
  cancelPasswordEdit(): void {
    this.newPassword = '';
    this.editPasswordIndex = null;
    this.passwordUpdateSuccessIndex = null;
    this.successMessage = '';
  }
  updateRol(index: number, user: User): void {

  }

  updateUsername(index:number, user:User):void{

  }
}
