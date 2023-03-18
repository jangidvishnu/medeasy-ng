import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent },
  { path: 'login', pathMatch: "full", component: LoginComponent },
  { path: 'signup', pathMatch: "full", component: SignupComponent },
  { path: 'contact', pathMatch: "full", component: ContactComponent },
  { path: 'user/dashboard', pathMatch: "full", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
