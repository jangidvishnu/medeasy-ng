import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from '../../services/logged-in-user-data/logged-in-user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrl = environment.image_url;
  playVideo = false;

  constructor(public loggedInUserDataService :LoggedInUserDataService) {
    if(!this.loggedInUserDataService.isUserLoggedIn){
      this.loggedInUserDataService.isUserHavePrivateKey=false;
    }
   }

  ngOnInit(): void {
  }

  setPrivateKeyStatus(status){
    if(localStorage.getItem("privateKey")){

    }
    else{
      this.loggedInUserDataService.isUserHavePrivateKey=status;
    }
    
  }

  setPlayVideo(option){
    this.playVideo=option;
  }

}
