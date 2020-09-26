import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/configs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ctrl-points',
  templateUrl: './ctrl-points.component.html',
  styleUrls: ['./ctrl-points.component.css']
})
export class CtrlPointsComponent implements OnInit {

  public isCollapsed = -1;
  controlListArray;any = [];

  controlListOptions:any =[];
  plannerData:any = []
  countLists;
  widgetId;

  selectedControlList: any;
  filterdOptions = [];

  checkedList = [];
 

  arraylistsArray = []
  loading = true;

    
  section: any = [];

  
  public items = ['item 1', 'item 2', 'item 3'];

  
  constructor(private modal: NgbModal,private _serve:ConfigService) {
    
  }

  ngOnInit(): void { 

    // select dropdown
  this._serve.onControlListOptions().subscribe(data2 => {

        
    this.controlListOptions=data2;
    this.widgetId = data2[0].widgetId;
    console.log("Control Point select - :" ,this.widgetId)
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
      })
  }

  toggleEditable(checking,data)
  {
    console.log('data', data)
    if(checking.target.checked == true)
    {
      
      console.log("working",checking)
      this.checkedList.push(data)
     //for displaying list of the selected dropdown
    }
    else{
      console.log("not working")
      this.checkedList = this.checkedList.filter(item=> item.name != data.name);
    }
    console.log('this.checkedList', this.checkedList);
  }
   





 // for displaying selected api list 
   onChange(widgetId) { 
    //for displaying list of the selected dropdown
    this._serve.onControlDescriptionList(widgetId).subscribe( controlPointData => 
      {
        this.controlListArray = controlPointData;
      })
      this.controlListArray.forEach( res => {
         // console.log(res.equipmentSetFields) 
          res.equipmentSetFields.forEach( repo1 =>  { 
            console.log(repo1)
            this.countLists = repo1.length
          })
          
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

  //modal
  open(modalContent){
    this.modal.open(modalContent, { centered: true});
  }

 
//refresh button
  eosRefresh(widgetId)
  { 
           this.loading = true;
           //this.checkedList = null
          this._serve.onControlDescriptionList(widgetId).subscribe( controlPointData => 
          {
            this.controlListArray = controlPointData;
          })

          this._serve.onControlListOptions().subscribe(data2 => {
          this.controlListOptions=data2;
          this.widgetId = data2[0].widgetId;   
          this.getControlList();
          });
  }


}