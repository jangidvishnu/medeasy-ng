import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRoles } from 'src/app/constants/UserRoles';
import { LoggedInUserDataService } from 'src/app/services/logged-in-user-data/logged-in-user-data.service';
import { RequestService } from 'src/app/services/request/request.service';
import { AppointmentsService } from 'src/app/services/user/appointments.service';
import { ReportsService } from 'src/app/services/user/reports.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {


  public USER_ROLES = UserRoles;

  activeAppointment = undefined;

  doctorAppointments = [{
    id: 1,
    issue: "Dengue",
    symptoms: "High Fever",
    doctorName: "Dr. U.S. Agarwal",
    status: "Pending",
    slot: "2023, Mar 28",
    patient_id: 6
  },
  {
    id: 2,
    issue: "Viral",
    symptoms: "High Fever, Cough",
    doctorName: "Dr. U.S. Agarwal",
    status: "Accepted",
    slot: "2023, Mar 26",
    patient_id: 6
  }]

  appointments = []

  patientReports = [];
  doctorsList = [];
  selectedDoctor = undefined;
  searchBoxValue = "";
  activeImage = "";

  addModalStatus: boolean = false;
  imageModalStatus: boolean = false;
  replyModalStatus: boolean = false;
  viewRepliesModalStatus: boolean = false;


  constructor(public loggedInUserData: LoggedInUserDataService, private toastr: ToastrService
    , private appointmentsService: AppointmentsService, private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  toggleAddModal() {
    this.addModalStatus = !this.addModalStatus;
  }
  toggleImageModal() {
    this.imageModalStatus = !this.imageModalStatus;
  }
  toggleReplyModal() {
    this.replyModalStatus = !this.replyModalStatus;
  }
  toggleViewRepliesModal() {
    this.viewRepliesModalStatus = !this.viewRepliesModalStatus;
  }

  setActiveImage(image) {
    this.activeImage = image;
    this.toggleImageModal();
  }


  makeAppointment(issue, symptoms, preferredDate) {
    this.appointmentsService.addAppointment(this.loggedInUserData.user?.id, this.selectedDoctor.id, issue, symptoms, preferredDate).subscribe(
      (res) => {
        if (res.success) {
          this.toastr.success("Made Request for Appointment", "MedEasy Admin", { closeButton: true });
          this.toggleAddModal();
          this.getAppointments
        }
        else {
          this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
        }
      }
    );
  }

  getDoctors(name) {
    this.appointmentsService.getDoctorsListByName(name).subscribe(
      (res) => {
        if (res.success) {
          this.searchBoxValue = name;
          this.doctorsList = res.data.doctors;
        }
        else {
          this.doctorsList = [];
          this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
        }
      }
    );
  }

  getAppointments() {
    this.appointmentsService.getAppointments(this.loggedInUserData.user?.id).subscribe(
      (res) => {
        this.appointments = res.data;
      }
    );
  }

  setActiveAppointment(appointment) {
    this.activeAppointment = appointment;
  }

  resetActiveAppointment() {
    this.activeAppointment = undefined;
  }

  setSelectedDoctor(doctor) {
    this.searchBoxValue = doctor.name;
    this.selectedDoctor = doctor;
  }

  extractMedicines(prescription) {
    prescription.map((med) => med.name);
  }

  getReportsOfPatient(id) {
    this.reportService.getReportsByPatientId(id).subscribe(
      (res) => {
        if (res.success) {
          this.patientReports = res.data;
          this.toastr.success("Reports Fetched Successfully", "MedEasy Admin", { closeButton: true });
        }
        else {
          this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
        }
      }
    );
  }

}
