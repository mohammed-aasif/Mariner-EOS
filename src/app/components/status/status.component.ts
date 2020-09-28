import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private modal: NgbModal,private _myservice:ConfigService) { }

  public loading = true;
  manufactArray = [];
  modalData:any = {};
  modalDatas:any = {}
  //modalOptimize:any = {}
  checkBoxes:any = []

  countList;
  
  section: any = [];
  statusListArray:any =[];

  ngOnInit(): void {
 
   this.loading = true;
    this._myservice.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData 
      });
      }


  

 

 
 

  open(modalContent, data:any){
    this.modalData = data;
    this._myservice.onStatusManufact(data.widgetId).subscribe( response =>{
      this.manufactArray = response.deviceRw
      //modal
      this.modal.open(modalContent, { centered: true});
    })
  }


  openSwitch(modalContent, data:any){  
    this.modalDatas = data.attributes;
    this._myservice.onStatusOptimization(data.attributes.CtrlPointLinkId).subscribe(respos => {
      this.checkBoxes = respos
    })
     //modal
     this.modal.open(modalContent, { centered: true});
   
  }
 
  
   eosRefresh()
  {
    this.loading = true;
    this._myservice.onStatusService().subscribe( statuslistsData => 
      {
        this.loading = false;
        this.statusListArray = statuslistsData  

      });
  }
 
}
