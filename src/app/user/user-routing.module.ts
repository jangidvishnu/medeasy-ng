import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';


const routes: Routes = [
  {
    path: 'user', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/(user:profile)'},
      { path: 'profile', component: ProfileComponent , outlet:'user' },
      { path: 'requests', component: RequestsComponent , outlet:'user' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
