import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'token-console';

  tokens: any[];

  constructor(private tokenService: TokenService) {
    this.tokens = [];
    this.tokenService.findAllTokens().subscribe({
      next: (res) => {
        this.tokens = res;
        console.log(this.tokens);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}
}
