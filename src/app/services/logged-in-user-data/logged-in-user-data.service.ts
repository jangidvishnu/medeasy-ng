import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserDataService {

  public isUserLoggedIn: boolean = false;
  public isUserHavePrivateKey: boolean;
  public user: any;

  constructor() {

  }

}
