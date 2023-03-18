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
export class MedicineService {

  private api_url = environment.api_url;
  private getMedicinesUrl = this.api_url + "medicine";
  private getAltMedicines = this.api_url + "medicine/alternatives";

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private loggedInUserData: LoggedInUserDataService) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  getMedicinesByName(name): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams({ fromString: "name=" + name })
    };
    return this.http.get<any>(this.getMedicinesUrl, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getAltMedicinesById(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams({ fromString: "searchParam=" + id })
    };
    return this.http.get<any>(this.getAltMedicines, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
}
