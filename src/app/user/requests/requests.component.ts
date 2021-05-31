import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggedInUserDataService } from 'src/app/logged-in-user-data.service';
import { RequestService } from 'src/app/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  imageUrl = environment.image_url;
  activeImage: string = "";
  requests = [];
  replies = [];
  activeRequestId: Number;
  requestStatus: string = '';
  addModalStatus: boolean = false;
  imageModalStatus: boolean = false;
  replyModalStatus: boolean = false;
  viewRepliesModalStatus: boolean = false;

  memberUploadedFiles: Array<File> = [];

  constructor(public loggedInUserData: LoggedInUserDataService, private toastr: ToastrService
    , private requestService: RequestService) {
  }

  ngOnInit(): void {
    if (this.loggedInUserData.user?.role == 'Customer') {
      this.getRequests();
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
          this.requests = res.data.requests;
          console.log(res.data);
        }
      }
    )
  }

  setStatus(status) {
    this.requestStatus = status;
  }

  setActiveRequestId(id) {
    this.activeRequestId = id;
    this.toggleReplyModal();
  }


  getStoreRequests() {
    this.requestService.getStoreRequests().subscribe(
      (res) => {
        if (res.success) {
          this.requests = res.data.requests;
          console.log(res.data);
        }
        else {
          this.requests = [];
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
  toggleReplyModal() {
    this.replyModalStatus = !this.replyModalStatus;
  }
  toggleViewRepliesModal() {
    this.viewRepliesModalStatus = !this.viewRepliesModalStatus;
  }



  fileChange(element) {
    this.memberUploadedFiles = element.target.files;
  }

  getReplyOfRequest(request_id) {
    this.toggleViewRepliesModal();
    this.requestService.getRepliesOfRequest(request_id).subscribe(
      (res)=>
      {
        if(res.success){
          this.replies = res.data.replies;
        }
        else{
          this.replies =[];
        }
      }
    )
  }

  replyRequest(remarks) {
    if (remarks && this.requestStatus && this.activeRequestId) {
      this.toggleReplyModal();
      this.requestService.replyRequest(this.activeRequestId, remarks, this.requestStatus).subscribe(
        (res) => {
          if (res.success) {
            this.toastr.success("Reply Sent Successfully", "MedEasy Admin", { closeButton: true });
            this.getStoreRequests();
          }
          else {
            this.toastr.success(res.msg, "MedEasy Admin", { closeButton: true });
          }
        }
      )
    }
    else {
      this.toastr.error("Fields are Missing", "Meadeasy Admin", { closeButton: true });
    }
  }

  sendRequest(description, pincode) {
    console.log(description, pincode);
    let requestForm = new FormData();
    if (this.memberUploadedFiles.length) {
      if (description) {
        requestForm.append("description", description.toString());
        requestForm.append("pincode", pincode.toString());
      }
      for (var i = 0; i < this.memberUploadedFiles.length; i++) {
        requestForm.append("request_file", this.memberUploadedFiles[i], this.memberUploadedFiles[i].name);
      }
      this.requestService.sendRequest(requestForm).subscribe(
        (res) => {
          if (res.success) {
            this.toastr.success("Request Successfully Sent", "MedEasy Admin", { closeButton: true });
          }
          else {
            this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
          }
        }
      );
      this.toggleAddModal();
    }
    else if (description) {
      requestForm.append("description", description.toString());
      requestForm.append("pincode", pincode.toString());
      this.requestService.sendRequest(requestForm).subscribe(
        (res) => {
          if (res.success) {
            this.toastr.success("Request Successfully Sent", "MedEasy Admin", { closeButton: true });
          }
          else {
            this.toastr.error(res.msg, "MedEasy Admin", { closeButton: true });
          }
        }
      );
      this.toggleAddModal();
    }
    else {
      this.toastr.error("Please attach image or fill description", "MedEasy Admin", { closeButton: true });
    }

  }

}
