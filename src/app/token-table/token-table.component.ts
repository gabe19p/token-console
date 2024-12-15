import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TokenService } from '../services/token.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
export class TokenTableComponent implements AfterViewInit {
  tokens: any[] = [];
  displayedColumns: string[] = [
    'tokenId',
    'tokenUsers',
    'tokenAvailability',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tokenService: TokenService) {
    this.dataSource = new MatTableDataSource(this.tokens);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
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
}
