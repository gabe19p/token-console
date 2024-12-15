import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TokenService } from '../services/token.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TokenAssignDialogComponent } from '../token-assign-dialog/token-assign-dialog.component';
import { TokenReturnDialogComponent } from '../token-return-dialog/token-return-dialog.component';
import { TokenDeleteDialogComponent } from '../token-delete-dialog/token-delete-dialog.component';
import { TokenDetailsDialogComponent } from '../token-details-dialog/token-details-dialog.component';

@Component({
  selector: 'app-token-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './token-table.component.html',
  styleUrl: './token-table.component.scss',
})
export class TokenTableComponent implements AfterViewInit, OnDestroy {
  tokens: any[] = [];
  displayedColumns: string[] = [
    'tokenId',
    'tokenUsers',
    'tokenAvailability',
    'action',
    'delete',
  ];
  dataSource: MatTableDataSource<any>;

  private tokenAddedSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tokenService: TokenService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tokens);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadTokens();

    // Subscribe to token added events
    this.tokenAddedSubscription = this.tokenService.tokenAdded$.subscribe(
      () => {
        this.loadTokens(); // Reload tokens when a new one is added
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.tokenAddedSubscription) {
      this.tokenAddedSubscription.unsubscribe();
    }
  }

  loadTokens() {
    this.tokenService.findAllTokens().subscribe({
      next: (res) => {
        this.tokens = res;
        this.dataSource.data = res; // Update dataSource when tokens are fetched
        console.log(this.tokens);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // Handle page change event
  onPageChange(event: any) {
    console.log(event);
    // Optionally, you can do any logic here for pagination
  }

  deleteToken(tokenId: number) {
    this.tokenService.deleteToken(tokenId).subscribe({
      next: (res) => {
        console.log('Token deleted successfully:', res);
        this.loadTokens(); // Reload tokens after deletion
      },
      error: (e) => {
        console.log('Error deleting token:', e);
      },
    });
  }

  returnToken(tokenId: number) {
    this.tokenService.returnToken(tokenId).subscribe({
      next: (res) => {
        console.log('Token returned successfully:', res);
        this.loadTokens();
      },
      error: (err) => {
        console.log('Error return token:', err);
      },
    });
  }

  openAssignDialog(tokenId: number) {
    const dialogRef = this.dialog.open(TokenAssignDialogComponent, {
      data: { tokenId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the assignToken service with the collected data
        this.tokenService
          .assignToken(result.tokenId, result.userId, result.userOrg)
          .subscribe({
            next: (res) => {
              console.log('Token assigned successfully:', res);
              // After assigning the token, reload the token data
              this.loadTokens();
            },
            error: (e) => {
              console.log('Error assigning token:', e);
            },
          });
      }
    });
  }

  openReturnDialog(tokenId: number): void {
    const dialogRef = this.dialog.open(TokenReturnDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.returnToken(tokenId);
      }
    });
  }

  openDeleteDialog(tokenId: number): void {
    const dialogRef = this.dialog.open(TokenDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteToken(tokenId);
      }
    });
  }

  openDetailsDialog(token: any): void {
    console.log('Token data:', token);
    this.dialog.open(TokenDetailsDialogComponent, {
      width: '400px',
      data: token,
    });
  }
}
