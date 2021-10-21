import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
LoginService

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  allParentData:any;
  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.service.getAllCountry().subscribe(res=>{
     
      this.allParentData = res;
      // console.log(this.allParentData, "allParentData");
    })
  }

  getChildData(event:any){
    console.log(event,"childData");
  }

}
