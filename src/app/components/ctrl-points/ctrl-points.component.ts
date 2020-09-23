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
  widgetId;

  selectedControlList: any;
  filterdOptions = [];


  arraylistsArray = []
  loading = true;
  
  constructor(private _serve:ConfigService) {
    
  }

  ngOnInit(): void { 

    // select dropdown
  this._serve.onControlListOptions().subscribe(data2 => {

        
    this.controlListOptions=data2;
    this.widgetId = data2[0].widgetId;
    console.log("fjsdlkfjsldk" ,this.widgetId)
    //console.log(data2);
    this.getControlList();
    });
  }

  getControlList()
  {
     //for displaying list of the selected dropdown
     this._serve.onControlDescriptionList(this.widgetId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData;
 
           //to display the count of the list
           this.controlListArray.forEach(countResponse => {
           this.countList = countResponse.equipmentSetFields.length  
          // console.log("The length of the array is :" , countResponse.equipmentSetFields.length); 
        
        });
      })
  }



 // for displaying selected api list 
   onChange(widgetId) { 

    console.log(widgetId)


    //for displaying list of the selected dropdown
    this._serve.onControlDescriptionList(widgetId).subscribe( controlPointData => 
      {
     
       
        this.controlListArray = controlPointData;
 
           //to display the count of the list
           this.controlListArray.forEach(countResponse => {
           this.countList = countResponse.equipmentSetFields.length  
          // console.log("The length of the array is :" , countResponse.equipmentSetFields.length); 
        
        });
      })

      
      // console.log("Selected id key is - :" ,widgetId);
      // this.controlListArray.forEach( res => {
      //    // console.log(res.equipmentSetFields) 
      //     res.equipmentSetFields.forEach( repo1 =>  { 
      //       console.log(repo1)
            
      //     })
          
      // });
        
  }



  checkboxes: any[] = [
    { name: 'AHA508', value: 'cb1', checked: false },
    { name: 'AHA508_TerminalUnits', value: 'cb2', checked: true },
    { name: 'AHA508', value: 'cb3', checked: false },
    { name: 'AHA508', value: 'cb4', checked: false },
    { name: 'AHA508_TerminalUnits', value: 'cb5', checked: false },
    { name: 'AHA508', value: 'cb3', checked: false },
    { name: 'AHA508', value: 'cb4', checked: false },
    { name: 'AHA508_TerminalUnits', value: 'cb5', checked: false },
    { name: 'AHA508', value: 'cb3', checked: false },
    { name: 'AHA508', value: 'cb4', checked: false },
    { name: 'AHA508_TerminalUnits', value: 'cb5', checked: false },
  ]


  CheckAllOptions() {
    if (this.checkboxes.every(val => val.checked == true))
      this.checkboxes.forEach(val => { val.checked = false });
    else
      this.checkboxes.forEach(val => { val.checked = true });
  }


  UnCheckAllOptions()
  {
    if (this.checkboxes.every(val => val.checked == false))
    this.checkboxes.forEach(val => { val.checked = true });
  else
    this.checkboxes.forEach(val => { val.checked = false });
  }


 
  openModal(){
    const buttonModal = document.getElementById("openModalButton")
    console.log('buttonModal', buttonModal)
    buttonModal.click()
  }
 

}