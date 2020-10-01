import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private modal: NgbModal,private _configService:ConfigService) { }

  public loading = true;
  manufactArray = [];
  storeSettingNewArray:any = [];
  storeOptimizeNewArray:any = []
  checkBoxes:any = []
  demoStoreArray = []
  statusListArray:any =[];
  storeNewSwitchArray:any= [] 


  ngOnInit(): void {
    this.loading = true;
    this._configService.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData 
        this.statusListArray.forEach( onStatusResponse =>{
         onStatusResponse.widgets.forEach(  Count =>{
         })
        })
      });
      }


// for displaying Setting popup
  open(modalContent, data:any){
    this.loading = true;
    this.storeSettingNewArray = data;
 
    this._configService.onStatusManufact(data.widgetId).subscribe( response =>{
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
   
    this._configService.onStatusOptimization(data.attributes.CtrlPointLinkId).subscribe(optimControl => {
      this.checkBoxes = optimControl
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
    this._configService.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData  

      });
  }


  checkSwitchList() {
    if (this.checkBoxes.every(val => val.checked == true))
      this.checkBoxes.forEach(val => { val.checked = false });
    else
      this.checkBoxes.forEach(val => { val.checked = true });
  }

  unCheckSwitchList() {
    if (this.checkBoxes.every(val => val.checked == false))
    {
      this.checkBoxes.forEach(val => { val.checked = true });
      console.log(this.checkBoxes.target.value)
    }
      this.checkBoxes.forEach(val => { val.checked = false });
     
  }


  //On optimization -> popup
  OnOptimizationOn(datas:any)
  {
      this.storeNewSwitchArray.forEach( optimOn =>{
        this._configService.onUpdateStatus(optimOn, true).subscribe();
        //for making initialization changes
        this.loading = true;
        this._configService.onStatusService().subscribe( statuslistsData => 
          {
            this.loading = false;
            this.statusListArray = statuslistsData 
            statuslistsData.forEach( onStatusResponse =>{
              onStatusResponse.widgets.forEach( ress =>{ 
              })
            })
          })
        })
  
  }
  
  //Off optimization -> popup
  OnOptimizationOff(datas:any)
  { 
    this.storeNewSwitchArray.forEach( optimOff =>{
      this._configService.onUpdateStatus(optimOff, false).subscribe();
      this.loading = true;
      this._configService.onStatusService().subscribe( statuslistsData => 
        {
          this.loading = false;
          this.statusListArray = statuslistsData 
          statuslistsData.forEach( onStatusResponse =>{
            onStatusResponse.widgets.forEach( ress =>{ 
            })
          })
        })
        })
    this.getDismissReasonoptimize
  }


 //for displaying selected cheked-list in popup
 toggleEditable(checking,data)
 {
   if(checking.target.checked == true)
   {
         this.storeNewSwitchArray.push(data)
   }
   else
   {
      this.storeNewSwitchArray = this.storeNewSwitchArray.filter(item=> item.name != data.name);
   }
 }



    
}
