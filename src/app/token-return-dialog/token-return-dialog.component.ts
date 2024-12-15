import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-token-return-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './token-return-dialog.component.html',
  styleUrl: './token-return-dialog.component.scss',
})
export class TokenReturnDialogComponent {
  constructor(private dialogRef: MatDialogRef<TokenReturnDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Return true when confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false when canceled
  }
}
