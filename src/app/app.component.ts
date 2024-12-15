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
  isExpanded = true;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {}
}
