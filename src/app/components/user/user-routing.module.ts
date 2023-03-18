import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsListComponent } from './doctor/patients-list/patients-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchAlternativesComponent } from './search-alternatives/search-alternatives.component';


const routes: Routes = [
  {
    path: 'user', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/(user:profile)' },
      { path: 'profile', component: ProfileComponent, outlet: 'user' },
      { path: 'appointments', component: AppointmentsComponent, outlet: 'user' },
      { path: 'reports', component: ReportsComponent, outlet: 'user' },
      { path: 'alternatives', component: SearchAlternativesComponent, outlet: 'user' },
      { path: 'patients', component: PatientsListComponent, outlet: 'user' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
