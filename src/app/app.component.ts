import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggedInUserDataService } from './services/logged-in-user-data/logged-in-user-data.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'medeasy';
  constructor(public loggedInUserData: LoggedInUserDataService, private cookieService: CookieService, private userService: UserService,
    private router : Router) {
    let access_token = this.cookieService.get("access_token");
    if (access_token) {
      loggedInUserData.isUserLoggedIn = true;
      this.getUserDetails();
    }
    else {
      loggedInUserData.isUserLoggedIn = false;
    }
  }

  getCustomBgFlag() {
    if (window.location.href.includes('user') || window.location.href.includes('admin') ) {
      return true;
    }
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      (res) => {
        console.log(res);
        if(res.success==true){
          this.loggedInUserData.user=res.data.user;
          this.router.navigateByUrl("/user/(user:profile)");
        } 
        else{
          this.loggedInUserData.isUserLoggedIn=false;
        }
      }
      ,
      (err) => {

      }
    )
  }

}
