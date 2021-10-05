import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  token:any = 'e090c25187ee2b3f9f1f8a02747356641'
  otpForm: FormGroup;  
  authToken:any;
  submitted:boolean = false;
  constructor( private http:HttpClient,
    private formBuilder: FormBuilder,  
    private router : Router,
    private httpService: LoginService,
    private toastr:ToastrService  ) { 
    
  }

  ngOnInit(): void {

   this.authToken = localStorage.getItem('token');
    this.otpForm = this.formBuilder.group({  
      otp: ['', Validators.required],  
   });  
  }

  verifyOtp() { 
    this.submitted = true;
    if(this.otpForm.invalid) {
      this.toastr.error("Please fill all the form");
       return;
    } else { 

     
      var formData: any = new FormData();
      formData.append("otp", this.otpForm.get('otp').value);
       formData.append("token", this.token);
       formData.append("authToken", this.authToken);
      console.log(formData);
       this.httpService.verifyOtp(formData).subscribe((response) => { 
           if(response["status"] == true){
            this.toastr.success('', response["message"]);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('username', response["username"]);
           }

          
           
           else{
            this.toastr.error('', response["message"]);
           }
            // localStorage.setItem('isLoggedIn', "true");  
            
                 
       },(error) => { 
        
       });
       
    }         
 }  

}
