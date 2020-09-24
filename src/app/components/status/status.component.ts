import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private _myservice:ConfigService) { }

 

  countList;
  
  section: any = [];
  statusListArray:any =[];

  ngOnInit(): void {

    this._myservice.onStatusService().subscribe( statuslistsData => 
      {
        
        this.statusListArray = statuslistsData
        
        this.statusListArray.forEach( statusRes => {
             statusRes.widgets.forEach(statusResSub =>{ 
             return this.countList = statusResSub.deviceRw.length;
          })
        })  
      })

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
