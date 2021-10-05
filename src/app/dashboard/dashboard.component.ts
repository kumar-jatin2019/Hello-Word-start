import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';  
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  testForm: FormGroup;
  token:any = 'e090c25187ee2b3f9f1f8a02747356641'
  username:any;
  userPayPrintData:any;
  authToken: string;
  showuser:boolean = false;
  loader:boolean = false;
  userPivotal: any;
  constructor( private http:HttpClient,
    private formBuilder: FormBuilder,  
    private fb: FormBuilder,
    private router : Router,
    private httpService: LoginService,
    private toastr:ToastrService  ) { 
    
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.authToken = localStorage.getItem('token');
    this.buildForm();

  }


  
  buildForm() {
    this.testForm = this.fb.group({
      pivotalArr: this.fb.array([])
    })

  }


  
  blankList() {
    console.log("blank");
    return this.fb.group({
      accountholder: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      ifsccode: ['', Validators.required],
      balance: ['', Validators.required],
      Address: ['', Validators.required],
    })
  }

  get pivotalArr(): FormArray {
    return this.testForm.get("pivotalArr") as FormArray
  }

  logout(){
    this.router.navigate(['/']);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('status');
  }


  getData(){
    
    this.loader = true;
    const formData: any = new FormData();
    formData.append("token", this.token);
    formData.append("authToken", this.authToken);

    this.httpService.getUsersData(formData).subscribe((response) => { 
     
      this.showuser = true;
      this.loader = false;
      console.log(response)
     this.userPivotal = response["data"][0]["paysprint"];
     
      if(response["data"][0]["paysprint"] != null){
         this.userPivotal.forEach(element => {
           this.getAllData(element)
         });
      }

    //   if(response["data"][0]["pivotal"] != null){
    //     this.userPivotal.forEach(element => {
    //       this.getAllData(element)
    //     });
    //  }

      
     console.log(this.userPivotal,"paysprint");

      
              
    },(error) => { 
     
    });
    
 }         
 getFieldData(data:any){
  return this.fb.group({
    accountholder: [data.accountholder, Validators.required],
    accountnumber: [data.accountnumber, Validators.required],
    bankname: [data.bankname, Validators.required],
    ifsccode: [data.ifsccode, Validators.required],
    balance: [data.balance, Validators.required],
    Address: [data.Address, Validators.required],
  })
 }

 getAllData(data){
  //  Object.assign({},obj1)
    if(data){
      this.pivotalArr.push(this.getFieldData(data));
    }else{
      this.pivotalArr.push(this.blankList());
    }
 }

 submit(){
  console.log(this.testForm);
 }
  }






