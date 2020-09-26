import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  public isCollapsed = -1;
  constructor(private modal: NgbModal,private _myservice:ConfigService) { }

  public loading = true;
  manufactArray = [];
  modalData:any = {};
 
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


  checkboxes: any[] = [
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

 
 

  open(modalContent, data:any){
    this.modalData = data;
    console.log('this.modalData', this.modalData)
     
    this._myservice.onStatusManufact(data.widgetId).subscribe( response =>{
      this.manufactArray = response.deviceRw
      this.modal.open(modalContent, { centered: true});
    })
 
    
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
