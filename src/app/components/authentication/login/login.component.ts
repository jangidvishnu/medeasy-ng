import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from '../../../services/logged-in-user-data/logged-in-user-data.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imageUrl = environment.image_url;
  spinnerFlag = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private cookieService: CookieService, private router: Router, public loggedInUserDataService: LoggedInUserDataService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.loggedInUserDataService.isUserLoggedIn) {
      this.router.navigateByUrl('/user');
    }
  }

  setPrivateKeyStatus(status) {
    this.loggedInUserDataService.isUserHavePrivateKey = status;
  }

  login() {
    this.spinnerFlag = true;
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    this.authService.login(email, password).subscribe(
      (res) => {
        this.spinnerFlag = false;
        if (res.success == false) {
            this.toastr.success(res.msg, "MedEasy Admin", { closeButton: true });
        }
        else {
          this.loggedInUserDataService.user = res.data.user;
          this.loggedInUserDataService.isUserLoggedIn = true;
          let acc_tok = res.accessToken;
          this.cookieService.set('access_token', "Bearer " + acc_tok);
          this.router.navigateByUrl('/user');
        }
        console.log(res);
      },
      (err) => {
        this.spinnerFlag = false;
        this.toastr.error(err, "medeasy Admin", { closeButton: true });
      }
    )
  }
}
