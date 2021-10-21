import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { LoginService } from '../login.service';




@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input () sendParentData:any =[]
  @Output() childData = new EventEmitter<any>()
  // @Output() childToParent = new EventEmitter<any>();
 
  constructor(private service:LoginService) { }

  ngOnInit(): void {
    this.sendParentData =[];
    this.getChildData();
  }

  ngOnChanges(changes:SimpleChange){
    // console.log(changes,"SimpleChanges");
    console.log(this.sendParentData, "Data from parent")

  }

  getChildData(){
    this.service.getAllDogs().subscribe(res=>{
      this.childData.emit(res["entries"])
    })
  }

 

}
