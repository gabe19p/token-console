import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-token-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './token-delete-dialog.component.html',
  styleUrl: './token-delete-dialog.component.scss',
})
export class TokenDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<TokenDeleteDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Return true when confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false when canceled
  }
}
