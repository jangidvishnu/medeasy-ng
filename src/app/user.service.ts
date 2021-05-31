import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedInUserDataService } from './logged-in-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = environment.api_url;

  private getUserDetailsUrl = this.api_url + 'user/getUserDetails';
  private getMembersUrl = this.api_url + 'user/getMembers';
  private updateUserUrl = this.api_url + 'admin/updateUser';

  constructor(private http: HttpClient,private cookieService:CookieService,private router:Router,private loggedInUserData:LoggedInUserDataService) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  getUserDetails(): Observable<any> {
    let access_token = this.cookieService.get("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token
      })
    };
    return this.http.get<any>(this.getUserDetailsUrl,httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  getMembers(): Observable<any> {
    let access_token = this.cookieService.get("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token
      })
    };
    return this.http.get<any>(this.getMembersUrl,httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  updateUser(user_id,req_id,field_name,field_value):Observable<any>{
    let access_token = this.cookieService.get("access_token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token
      })
    };
    let data = {
      user_id: user_id,
      req_id :req_id,
      field_name:field_name,
      field_value:field_value
    }
    return this.http.post<any>(this.updateUserUrl,data,httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
