import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoggedInUserDataService } from '../logged-in-user-data/logged-in-user-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;

  private login_url = this.api_url + 'auth/login';
  private signup_url = this.api_url + 'auth/signup';
  private logout_url = this.api_url + 'auth/logout';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private loggedInUserData: LoggedInUserDataService) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  login(email, password): Observable<any> {
    let data = {
      email: email,
      password: password,
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post<any>(this.login_url, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  signup(name, email, role, password, re_password, address, pincode): Observable<any> {
    let data = {
      name: name,
      email: email,
      role: role,
      address : address,
      pincode : pincode,
      password : password,
      re_password : re_password
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post<any>(this.signup_url, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  logout(): Observable<any> {
    let access_token = this.cookieService.get("access_token");
    this.cookieService.delete('access_token');
    this.loggedInUserData.isUserLoggedIn = false;
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token
      })
    };
    return this.http.post<any>(this.logout_url, "", httpOptions).pipe(
      catchError(this.errorHandler)
    );;
  }

}
