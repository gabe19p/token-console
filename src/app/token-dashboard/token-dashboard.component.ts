import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';

Chart.register(...registerables);

@Component({
  selector: 'app-token-dashboard',
  templateUrl: './token-dashboard.component.html',
  styleUrls: ['./token-dashboard.component.scss'],
  imports: [MatCardModule],
  standalone: true,
})
export class TokenDashboardComponent implements OnInit {
  tokens: any[] = [];
  availableCount: number = 0;
  unavailableCount: number = 0;
  tokensByDate: { [key: string]: number } = {};
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTokens();
  }

  getTokens(): void {
    this.http.get<any[]>('/api/tokens').subscribe((data) => {
      console.log('Fetched Tokens:', data);
      this.tokens = data;
      this.processTokenData();
      this.createChart();
    });
  }

  processTokenData(): void {
    this.availableCount = this.tokens.filter(
      (token) => token.tokenAvailable
    ).length;
    this.unavailableCount = this.tokens.filter(
      (token) => !token.tokenAvailable
    ).length;

    // Reset tokensByDate before processing
    this.tokensByDate = {};

    this.tokens.forEach((token) => {
      // Check if currentUser exists and has a dateIssued field
      if (
        token.currentUser &&
        token.currentUser.length > 0 &&
        token.currentUser[0].dateIssued
      ) {
        const date = new Date(
          token.currentUser[0].dateIssued
        ).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        // Increment count of tokens by date
        this.tokensByDate[date] = (this.tokensByDate[date] || 0) + 1;
      }
    });

    console.log('Tokens By Date:', this.tokensByDate); // Check the tokensByDate after processing
  }

  createChart(): void {
    const dates = Object.keys(this.tokensByDate);
    const counts = Object.values(this.tokensByDate);

    const ctx = document.getElementById('tokensChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Tokens Issued',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
