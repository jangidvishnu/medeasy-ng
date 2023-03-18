import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  imageUrl = environment.image_url;
  spinnerFlag = false;

  signupForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required]),
    repassword : new FormControl('',[Validators.required]),
    role : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    pincode : new FormControl('',[Validators.required])
  });

  constructor(private toastr : ToastrService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  getRole(){
    return this.signupForm.get("role");
  }

  signup(){
    if(this.signupForm.valid){
      let email = this.signupForm.get("email").value;
      let name = this.signupForm.get("name").value;
      let password = this.signupForm.get("password").value;
      let repassword = this.signupForm.get("repassword").value;
      let role = this.signupForm.get("role").value;
      let address = this.signupForm.get("address").value;
      let pincode = this.signupForm.get("pincode").value;
      this.authService.signup(name,email,role,password,repassword,address,pincode).subscribe(
        (res) => {
          if(res.success){
            this.toastr.success(res.msg,"MedEasy Admin",{closeButton:true});
            this.router.navigateByUrl("/login");
          }
          else{
            this.toastr.error(res.msg,"MedEasy Admin",{closeButton:true});
          }
        }
      );      
    }
    else{
      this.toastr.error("Fields are Missing", "MedEasy Admin", { closeButton: true });
    }
  }
}
