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
  setPointId;
  selectedControlList: any;
  filterdOptions = [];
  checkBoxes: any[] = []
  checkedList:any = []; 
  storeNewSwitchArray:any =[]
  loading = true;  
  storeOptimizeNewArray:any = []
 
  constructor(private modal: NgbModal,private _configService:ConfigService) {}

  ngOnInit(): void { 
    // select dropdown
    this.loading = true;
    this._configService.onControlListOptions().subscribe(selectResponse => { 
      this.loading = false;
      this.controlListOptions=selectResponse;
      this.setPointId = selectResponse[0].widgetId;
      this.selectedControlList = this.setPointId
      this.getControlList();
    });
    this.loading = true;
    this._configService.onControlDescriptionList(this.setPointId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
      })
     }

 //for displaying list of the selected dropdown
  getControlList()
  {  
     this.loading = true;
     this._configService.onControlDescriptionList(this.setPointId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
      })
  }
 
 // for displaying selected api list 
   onChange(widgetId) { 
    //for displaying list of the selected dropdown
    this.loading = true;
    this._configService.onControlDescriptionList(widgetId).subscribe( controlPointData => 
      {
           this.loading = false;
        this.controlListArray = controlPointData;
      })
  }

 
//refresh button
  eosRefresh(widgetId)
  { 
    this.loading = true;
   
    this._configService.onControlDescriptionList(widgetId).subscribe( controlPointData => 
    {
      this.controlListArray = controlPointData;
      this.checkedList = [];
    })

    this._configService.onControlListOptions().subscribe(selectResponse => {
      this.controlListOptions=selectResponse;
      this.setPointId = selectResponse[0].widgetId;   
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
    
      if(getList.target.checked == true)
      {
        this.checkedList.push(data) 
      }
      else{
        this.checkedList = this.checkedList.filter(item=> item.name != data.name);
        
      }  
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



    //On optimization -> popup
    OnOptimizationOn(datas:any)
    {
        this.storeNewSwitchArray.forEach( optimOn =>{ 
        this._configService.onUpdateStatus(optimOn, true).subscribe();
        // for making initialization
          this._configService.onControlListOptions().subscribe(selectResponse => { 
          this.controlListOptions=selectResponse;
          this.setPointId = selectResponse[0].widgetId;
          this.selectedControlList = this.setPointId
          this.getControlList();
        });
        this.loading = true;
        this._configService.onControlDescriptionList(this.setPointId).subscribe( controlPointData => 
          {
            this.loading = false;
            this.controlListArray = controlPointData; 
          })
        })
    }

    
    //Off optimization -> popup
    OnOptimizationOff(datas:any)
    { 
      this.storeNewSwitchArray.forEach( optimOff =>{
      this._configService.onUpdateStatus(optimOff, false).subscribe(); 
      // for making initialization
      this._configService.onControlListOptions().subscribe(selectResponse => { 
        this.controlListOptions=selectResponse;
        this.setPointId = selectResponse[0].widgetId;
        this.selectedControlList = this.setPointId
        this.getControlList();
      });
      this.loading = true;
      this._configService.onControlDescriptionList(this.setPointId).subscribe( controlPointData => 
        {
          this.loading = false;
          this.controlListArray = controlPointData; 
        })
      })
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
   if(getListSwitch.target.checked == true)
   {
      this.storeNewSwitchArray.push(data)
   }
   else
   {
      this.storeNewSwitchArray = this.storeNewSwitchArray.filter(item=> item.name != data.name);
   }
 }


}