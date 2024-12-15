import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-token-assign-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './token-assign-dialog.component.html',
  styleUrl: './token-assign-dialog.component.scss',
})
export class TokenAssignDialogComponent {
  userId: string = '';
  userOrg: string = '';

  constructor(
    public dialogRef: MatDialogRef<TokenAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    this.dialogRef.close({
      userId: this.userId,
      userOrg: this.userOrg,
      tokenId: this.data.tokenId,
    });
  }

  onCancel(): void {
    // Close the dialog without returning anything
    this.dialogRef.close();
  }
}
