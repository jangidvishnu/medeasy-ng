import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { LoggedInUserDataService } from 'src/app/logged-in-user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  spinnerFlag = false;

  constructor(public loggedInUSerData: LoggedInUserDataService,public router:Router, private authService: AuthService, private toastr: ToastrService) {
    if(loggedInUSerData.isUserLoggedIn==false){
      this.router.navigateByUrl("\login");
      this.toastr.error("You are not logged in","medeasy Admin",{closeButton:true});
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.spinnerFlag = true;
    this.authService.logout().subscribe(
      (res) => {
        this.spinnerFlag = false;
        if (res.success == true) {
          this.toastr.success("Logout Successfully !", "medeasy Admin", { closeButton: true });
          this.router.navigateByUrl("/login");
        }
      },
      (err) => {
        this.spinnerFlag = false;
      }
    )
  }

}
