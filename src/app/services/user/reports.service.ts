import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = environment.py_api_url;
  private reportAPIUrl = this.apiUrl + "api/report"

  constructor(private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  addReport(name, attachment, patient_id, appointment_id): Observable<any> {
    let data = {
      name: name,
      attachment: attachment,
      patient_id: patient_id,
      appointment_id: appointment_id
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post<any>(this.reportAPIUrl, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getReportsByPatientId(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams({ fromString: "patient_id=" + id })
    };
    return this.http.get<any>(this.reportAPIUrl, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

}
