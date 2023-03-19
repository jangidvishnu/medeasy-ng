import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private apiUrl = environment.py_api_url;
  private appointmentAPIUrl = this.apiUrl + "api/appointment"
  private doctorsAPIUrl = environment.api_url + "doctors"

  constructor(private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  addAppointment(patient_id, doctor_id, issue, symptoms, preferredDate): Observable<any> {
    let data = {
      "patient_id": patient_id,
      "doctor_id": doctor_id,
      "issue": issue,
      "symptoms": symptoms,
      "preferredDate": preferredDate,
      "status": "PENDING"
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post<any>(this.appointmentAPIUrl, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getDoctorsListByName(name) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams({ fromString: "name=" + name })
    };
    return this.http.get<any>(this.doctorsAPIUrl, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getAppointments(user_id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: new HttpParams({ fromString: "user_id=" + user_id })
    };
    return this.http.get<any>(this.appointmentAPIUrl, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
}
