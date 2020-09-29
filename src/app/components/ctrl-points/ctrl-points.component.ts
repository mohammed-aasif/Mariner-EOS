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
  countLists;
  widgetId;

  selectedControlList: any;
  filterdOptions = [];
  checkboxes: any[] = []
  checkedList:any = []; 
  pushArray =[]
  loading = true;  
  
  constructor(private modal: NgbModal,private _serve:ConfigService) {
    
  }

  ngOnInit(): void { 

    // select dropdown
    this._serve.onControlListOptions().subscribe(data2 => {
    this.controlListOptions=data2;
    this.widgetId = data2[0].widgetId;
    this.getControlList();
    });


    this._serve.onControlDescriptionList(this.widgetId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
        controlPointData.forEach( res => {
         res.forEach( ress =>
          {
            console.log("equipmentSetFields", ress.equipmentSetFields.name)
          })
        })
      })

      
  }

 //for displaying list of the selected dropdown
  getControlList()
  {
    
     this._serve.onControlDescriptionList(this.widgetId).subscribe( controlPointData => 
      {
        this.loading = false;
        this.controlListArray = controlPointData; 
        controlPointData.forEach( res => {
      //    console.log("Length check" , res)
        })
      })
  }

  //for displaying selected cheked-list in popup
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
  }






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

  

 
//refresh button
  eosRefresh(widgetId)
  { 
    this.loading = true;
   
    this._serve.onControlDescriptionList(widgetId).subscribe( controlPointData => 
    {
      this.controlListArray = controlPointData;
      //this.checkedList = ""
    })

    this._serve.onControlListOptions().subscribe(data2 => {
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
 


    openTwo(modalContent, datas) {  
      console.log(datas)
       //for displaying list of the selected dropdown
       this._serve.onControlDescriptionList(datas).subscribe( controlPointData => 
        {
       
          //this.pushArray = controlPointData.id; 
          console.log("Optimization Buttons", controlPointData )
        })
      //default modal
      this.modal.open(modalContent, { centered: true});
       this.getDismissReasonOptimize
      }
  
      private getDismissReasonOptimize( ): string {
        if (ModalDismissReasons.ESC) {
          return;
        } else if (ModalDismissReasons.BACKDROP_CLICK) {
          return;
        } 
      }
   

}