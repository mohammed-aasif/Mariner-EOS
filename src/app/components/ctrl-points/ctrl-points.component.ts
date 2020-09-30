import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/configs.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-ctrl-points',
  templateUrl: './ctrl-points.component.html',
  styleUrls: ['./ctrl-points.component.css']
})
export class CtrlPointsComponent implements OnInit {

 
  controlListArray;any = [];
  controlListOptions:any =[];
  plannerData:any = []

  widgetId;

  selectedControlList: any;
  filterdOptions = [];
  checkBoxes: any[] = []
  checkedList:any = []; 
  storeNewSwitchArray:any =[]
  loading = true;  
  storeOptimizeNewArray:any = []
  
  constructor(private modal: NgbModal,private _configService:ConfigService) {
    
  }

  ngOnInit(): void { 

    // select dropdown
    this._configService.onControlListOptions().subscribe(data2 => { 
    this.controlListOptions=data2;
    this.widgetId = data2[0].widgetId;
    this.selectedControlList = this.widgetId
    this.getControlList();
    });


    this._configService.onControlDescriptionList(this.widgetId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
        
        controlPointData.forEach( controlResponse => {
         controlResponse.forEach( controlResponseChild =>
          {
            console.log("equipmentSetFields", controlResponseChild.equipmentSetFields.name)
          })
        })
      })
 
    
      
  }

 //for displaying list of the selected dropdown
  getControlList()
  {
    
     this._configService.onControlDescriptionList(this.widgetId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
        
        controlPointData.forEach( res => {
      //    console.log("Length check" , res)
        })
      })
  }
 





 // for displaying selected api list 
   onChange(widgetId) { 
    //for displaying list of the selected dropdown
    this._configService.onControlDescriptionList(widgetId).subscribe( controlPointData => 
      {
        this.controlListArray = controlPointData;
      })
  }






  checkSwitchList() {
    if (this.checkBoxes.every(val => val.checked == true))
      this.checkBoxes.forEach(val => { val.checked = false });
    else
      this.checkBoxes.forEach(val => { val.checked = true });
  }


  UnCheckSwitchList()
  {
    if (this.checkBoxes.every(val => val.checked == false))
        this.checkBoxes.forEach(val => { val.checked = true });
     else
         this.checkBoxes.forEach(val => { val.checked = false });
  }

  

 
//refresh button
  eosRefresh(widgetId)
  { 
    this.loading = true;
   
    this._configService.onControlDescriptionList(widgetId).subscribe( controlPointData => 
    {
      this.controlListArray = controlPointData;
      //this.checkedList =""
    })

    this._configService.onControlListOptions().subscribe(data2 => {
    this.controlListOptions=data2;
    this.widgetId = data2[0].widgetId;   
    this.getControlList();
    });
  }



    open(modalContent) {
    this.modal.open(modalContent, { centered: true});
      this.getDismissReason
    }

    private getDismissReason( ): string {
      if (ModalDismissReasons.ESC) {
        return;
      } else if (ModalDismissReasons.BACKDROP_CLICK) {
        return;
      } 
    }
 


  //for displaying Optimization popup
  openSwitch(modalContent, datas:any){ 
    
      
      
      
      this._configService.onControlDescriptionList(this.selectedControlList).subscribe( controlPointData => 
        {
          this.checkBoxes = controlPointData
        })
 
    
      //modal default
     this.modal.open(modalContent, { centered: true});
     this.getDismissReasonSettingClose
  }

  private getDismissReasonSettingClose(): string {
    if (ModalDismissReasons.ESC) {
      return;
    } else if (ModalDismissReasons.BACKDROP_CLICK) {
     
      return;

    } 
  }

    //for displaying selected cheked-list in popup
    toggleEditable(getList,data)
    {
      console.log('data', data)
      if(getList.target.checked == true)
      {
        
        console.log("working",getList)
        this.checkedList.push(data)
       //for displaying list of the selected dropdown
      }
      else{
        console.log("not working")
        this.checkedList = this.checkedList.filter(item=> item.name != data.name);
      }
      console.log('this.checkedList', this.checkedList);
    }
   
    
    


    //On optimization -> popup
    OnOptimizationOn(datas:any)
    {
        this.storeNewSwitchArray.forEach( optimOn =>{
          this._configService.onUpdateStatus(optimOn, true).subscribe();
        } )
    }
    
    //Off optimization -> popup
    OnOptimizationOff(datas:any)
    { 
      this.storeNewSwitchArray.forEach( optimOff =>{
        this._configService.onUpdateStatus(optimOff, false).subscribe();
      } )
      this.getDismissReasonSwitchOff
    }

    
  private getDismissReasonSwitchOff(): string {
    if (ModalDismissReasons.ESC) {
      return;
    } else if (ModalDismissReasons.BACKDROP_CLICK) {
     
      return;

    } 
  }



 //for displaying selected cheked-list in popup
 toggleEditableOptimSwitch(getListSwitch,data)
 {
   console.log('data', data)
   if(getListSwitch.target.checked == true)
   {
       // console.log("working",getListSwitch)
         this.storeNewSwitchArray.push(data)
   }
   else
   {
      console.log("not working")
      this.storeNewSwitchArray = this.storeNewSwitchArray.filter(item=> item.name != data.name);
   }
  
 }




}