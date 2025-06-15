import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historical-appointments-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historical-appointments-modal.component.html',
  styleUrl: './historical-appointments-modal.component.css'
})
export class HistoricalAppointmentsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<HistoricalAppointmentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public historyData: any[]
  ) {
    console.log('Historial recibido en el modal:', historyData);
  }

  close(): void {
    this.dialogRef.close();
  }
}
