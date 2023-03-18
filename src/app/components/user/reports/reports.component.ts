import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRoles } from 'src/app/constants/UserRoles';
import { LoggedInUserDataService } from 'src/app/services/logged-in-user-data/logged-in-user-data.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ReportsService } from 'src/app/services/user/reports.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  USER_ROLES = UserRoles;
  imageUrl = environment.image_url;
  activeImage: string = "";
  patientReports = [];

  activeRequestId: Number;
  addModalStatus: boolean = false;
  imageModalStatus: boolean = false;
  viewRepliesModalStatus: boolean = false;
  fileBlob: any = undefined;
  memberUploadedFiles: Array<File> = [];

  constructor(public loggedInUserData: LoggedInUserDataService, private toastr: ToastrService
    , private requestService: RequestService, private reportService: ReportsService) {
  }

  ngOnInit(): void {
    if (this.loggedInUserData.user?.role == UserRoles.PATIENT) {
      this.getRequests();
      this.getReportsOfPatient(this.loggedInUserData.user?.id);
    }
    if (this.loggedInUserData.user?.role == 'Chemist') {
      this.getStoreRequests();
    }
  }

  getRequests() {
    this.requestService.getRequests().subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.patientReports = res.data.requests;
          console.log(res.data);
        }
      }
    )
  }

  getStoreRequests() {
    this.requestService.getStoreRequests().subscribe(
      (res) => {
        if (res.success) {
          this.patientReports = res.data.requests;
          console.log(res.data);
        }
        else {
          this.patientReports = [];
        }
      }
    )
  }

  setActiveImage(image) {
    this.activeImage = image;
    this.toggleImageModal();
  }

  toggleAddModal() {
    this.addModalStatus = !this.addModalStatus;
  }
  toggleImageModal() {
    this.imageModalStatus = !this.imageModalStatus;
  }
  toggleViewRepliesModal() {
    this.viewRepliesModalStatus = !this.viewRepliesModalStatus;
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  fileChange(element) {
    this.memberUploadedFiles = element.target.files;
    const file = element.target.files[0];
    this.changeFile(file).then((base64: string): any => {
      this.fileBlob = base64;
    });
  }

  addReport(description) {
    if (this.fileBlob && description) {
      this.reportService.addReport(description, this.fileBlob, this.loggedInUserData.user?.id, null).subscribe(
        (res) => {
          if (res.success) {
            this.toastr.success("Report Added Successfully", "MedEasy Admin", { closeButton: true });
          }
          else {
            this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
          }
        }
      );
      this.toggleAddModal();
    } else {
      this.toastr.error("Please attach report file and fill name of report", "MedEasy Admin", { closeButton: true });
    }
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
