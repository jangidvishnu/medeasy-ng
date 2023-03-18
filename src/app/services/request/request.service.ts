import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedInUserDataService } from '../logged-in-user-data/logged-in-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api_url = environment.api_url;

  private sendRequestUrl = this.api_url + "user/sendRequest";
  private getRequestsUrl = this.api_url + "user/getRequests";
  private replyRequestsUrl = this.api_url + "user/replyRequest";
  private getRepliesOfRequestUrl = this.api_url + "user/getRepliesOfRequest";
  private getStoreRequestsUrl = this.api_url + "user/getStoreRequests";
  private getSingleRequestUrl = this.api_url + "admin/getSingleRequest";

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private loggedInUserData: LoggedInUserDataService) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  sendRequest(requestFormData): Observable<any> {
    
    let access_token = this.cookieService.get("access_token");

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };
    return this.http.post<any>(this.sendRequestUrl, requestFormData, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }


  getRequests(): Observable<any> {
    
    let access_token = this.cookieService.get("access_token");

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };
    
    return this.http.get<any>(this.getRequestsUrl,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getStoreRequests(): Observable<any> {
    
    let access_token = this.cookieService.get("access_token");

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };
    
    return this.http.get<any>(this.getStoreRequestsUrl,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  replyRequest(request_id, remarks,status){
    
    let access_token = this.cookieService.get("access_token");

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };

    let data = {
      request_id: request_id,
      remarks: remarks,
      status: status,
    }
    return this.http.post<any>(this.replyRequestsUrl, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getRepliesOfRequest(request_id): Observable<any> {
    let access_token = this.cookieService.get("access_token");
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      }),
      params: new HttpParams({ fromString: "request_id=" + request_id })
    };
    return this.http.get<any>(this.getRepliesOfRequestUrl,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

}
