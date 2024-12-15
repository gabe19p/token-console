import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenTableComponent } from './token-table/token-table.component';
import { TokenDashboardComponent } from './token-dashboard/token-dashboard.component';

const routes: Routes = [
  { path: 'tokens', component: TokenTableComponent },
  { path: 'dashboard', component: TokenDashboardComponent },
  {
    path: '',
    redirectTo: '/tokens',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
