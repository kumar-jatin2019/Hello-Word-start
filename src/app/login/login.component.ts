import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';



//import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  token: any = 'e090c25187ee2b3f9f1f8a02747356641'
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: LoginService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toastr.error("Please fill all the form");
      return;
    } else {


      var formData: any = new FormData();
      formData.append("username", this.loginForm.get('username').value);
      formData.append("password", this.loginForm.get('password').value);
      formData.append("token", this.token);
      console.log(formData);
      this.httpService.login(formData).subscribe((response) => {
        if (response["status"] == true) {
          this.toastr.success('', response["message"]);
          localStorage.setItem('token', response["authToken"]);
          localStorage.setItem('status', response["status"]);

          if (response["twostep"] == 1) {
            this.router.navigate(['/verifyotp']);
          }

          if (response["twostep"] == 0) {
            this.router.navigate['dashboard'];
          }


        }



        else {
          this.toastr.error('', response["message"]);
          localStorage.removeItem('token');
        }
        // localStorage.setItem('isLoggedIn', "true");  


      }, (error) => {

      });

    }
  }


}
