import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/configs.service';

@Component({
  selector: 'app-ctrl-points',
  templateUrl: './ctrl-points.component.html',
  styleUrls: ['./ctrl-points.component.css']
})
export class CtrlPointsComponent implements OnInit {

  section: any = [];
  controlListArray;any = [];

  controlListOptions:any =[];
  plannerData:any = []
  countList;


  selectedUser: any;
  filterdOptions = [];


  arraylistsArray = []
  constructor(private _serve:ConfigService) {
    
  }

  ngOnInit(): void { 

    
  this._serve.onControlListOptions().subscribe(data2 => {
        
    this.controlListOptions=data2;
   //console.log(data2);
    });

    //for displaying list of the selected dropdown
    this._serve.onControlDescriptionList().subscribe( controlPointData => 
      {
        this.controlListArray = controlPointData;
           //to display the count of the list
           this.controlListArray.forEach(countResponse => {
           this.countList = countResponse.equipmentSetFields.length  
          // console.log("The length of the array is :" , countResponse.equipmentSetFields.length); 
        });
      })

  }

 
   onChange(id) { 
    this.filterdOptions = this.controlListArray.filter(
      item => {
          //console.log("The value  of item - :" , item.id)
          item.equipmentSetFields.filter( responses => { 
          console.log("The values of spaces = : ",  responses.id)  
         // return responses.id = id;
          return this.controlListOptions.id = this.controlListArray
          
        });
       
      }
    )
       
  }


}