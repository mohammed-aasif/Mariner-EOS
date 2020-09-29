import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private modal: NgbModal,private _myservice:ConfigService) { }

  public loading = true;
  manufactArray = [];
  storeSettingNewArray:any = [];
  storeOptimizeNewArray:any = []
  checkBoxes:any = []

  demoStoreArray = []

  countList;
  switchControl;
  statusListArray:any =[];
  storeNewSwitchArray:any= []
  

  ngOnInit(): void {
 

   this.loading = true;
    this._myservice.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData 
        statuslistsData.forEach( res =>{
         res.widgets.forEach( ress =>{
        //  console.log( ress.deviceRw.length)  
         })
        })
      });
      }


// for displaying Setting popup
  open(modalContent, data:any){
    this.loading = true;
    this.storeSettingNewArray = data;
 
    this._myservice.onStatusManufact(data.widgetId).subscribe( response =>{
      this.manufactArray = response.deviceRw
      this.loading = false;
    })
    //modal default
    this.modal.open(modalContent, { centered: true});
     this.getDismissReasonSettingClose
   
  }

  //for displaying Optimization popup
  openSwitch(modalContent, data:any){ 
    this.loading = true; 
    this.storeOptimizeNewArray = data.attributes;
   
    this._myservice.onStatusOptimization(data.attributes.CtrlPointLinkId).subscribe(respos => {
      this.checkBoxes = respos
      this.loading = false;
    })
     //modal default
     this.modal.open(modalContent, { centered: true});
     this.getDismissReasonoptimize
  }

  private getDismissReasonSettingClose(): string {
    if (ModalDismissReasons.ESC) {
      return;
    } else if (ModalDismissReasons.BACKDROP_CLICK) {
     
      return;

    } 
  }

  private getDismissReasonoptimize(): string {
    if (ModalDismissReasons.ESC) {
      return;
    } else if (ModalDismissReasons.BACKDROP_CLICK) {
      return;
    } 
  }


 
  // refresh
   eosRefresh()
  {
    this.loading = true;
    this._myservice.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData  

      });
  }


  CheckAllOptions() {
    if (this.checkBoxes.every(val => val.checked == true))
      this.checkBoxes.forEach(val => { val.checked = false });
    else
      this.checkBoxes.forEach(val => { val.checked = true });
  }

  UnCheckAllOptions() {
    if (this.checkBoxes.every(val => val.checked == false))
    {
      this.checkBoxes.forEach(val => { val.checked = true });
      console.log(this.checkBoxes.target.value)
    }
    
    
    else
    {
      this.checkBoxes.forEach(val => { val.checked = false });
    }
      
  }


  //On optimization -> popup
  OnOptimizationOn(datas:any)
  {
 
      this.storeNewSwitchArray.forEach( respo =>{
        this._myservice.onUpdateStatus(respo, true).subscribe();
      } )
         
      
  
  }
  
  //Off optimization -> popup
  OnOptimizationOff(datas:any)
  { 
   
    this.storeNewSwitchArray.forEach( respo =>{
      this._myservice.onUpdateStatus(respo, false).subscribe();
    } )
  
    
    
  }


 //for displaying selected cheked-list in popup
 toggleEditable(checking,data)
 {
   //console.log('data', data)
   if(checking.target.checked == true)
   {
       // console.log("working",checking)
         this.storeNewSwitchArray.push(data)
   }
   else
   {
      console.log("not working")
      this.storeNewSwitchArray = this.storeNewSwitchArray.filter(item=> item.name != data.name);
   }
  
     console.log('Last Console', this.storeNewSwitchArray);
 }



    
}
