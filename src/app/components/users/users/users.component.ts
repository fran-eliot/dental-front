import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { User } from '../../../model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

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
  editIndex: number | null = null;
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

  startEdit(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = null;
  }

  enableEditPassword(index: number): void {
    this.editPasswordIndex = index;
    this.newPassword = '';
    this.passwordUpdateSuccessIndex = null;
  }

  cancelPasswordEdit(): void {
    this.newPassword = '';
    this.editPasswordIndex = null;
    this.passwordUpdateSuccessIndex = null;
    this.successMessage = '';
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

  //Actualiza todos los campos
  updateUserFields(index: number, user: User): void {
    const calls = [];

    const originalUser = this.users[index];

    // Aquí puedes comparar con el valor original si quieres evitar actualizaciones innecesarias
    calls.push(this.userService.updateUsername(user.id_users, user.username_users));
    calls.push(this.userService.updateRol(user.id_users, user.rol_users));
    calls.push(this.userService.updateStatus(user.id_users, user.is_active_users));

    forkJoin([...calls]).subscribe({
      next: () => {
        this.editIndex = null;
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }
}
