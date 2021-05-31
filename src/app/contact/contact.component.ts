import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedInUserDataService } from '../logged-in-user-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  image_url = environment.image_url;

  constructor(private loggedInUserDataService :LoggedInUserDataService) { }

  ngOnInit(): void {
  }

  setPrivateKeyStatus(status){
    this.loggedInUserDataService.isUserHavePrivateKey=status;
  }

}
