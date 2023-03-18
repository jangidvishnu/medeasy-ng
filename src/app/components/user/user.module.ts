import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchAlternativesComponent } from './search-alternatives/search-alternatives.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';


@NgModule({
  declarations: [ProfileComponent, RequestsComponent, ProfileComponent, DoctorProfileComponent, AppointmentsComponent, ReportsComponent, SearchAlternativesComponent, AppointmentDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
