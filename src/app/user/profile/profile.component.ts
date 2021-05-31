import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from 'src/app/logged-in-user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  img_url = environment.image_url;

  constructor(public loggedInUserData:LoggedInUserDataService) { }

  ngOnInit(): void {
  }

}
