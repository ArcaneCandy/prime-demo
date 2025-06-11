import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { BankingComponent } from './components/banking/banking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'organisation',
    data: { breadcrumb: 'Organisation' },
    component: OrganisationComponent,
  },
  {
    path: 'banking',
    data: { breadcrumb: 'Banking' },
    component: BankingComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
