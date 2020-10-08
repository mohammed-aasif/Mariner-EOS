import { Component,ViewChild, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { ContextMenuComponent } from 'ngx-contextmenu';

import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { ConfigService } from '../../services/configs.service'; 
 import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
 import Swal from 'sweetalert2'


var moment = require("moment");
declare var require: any;


const colors: any = {red: {primary: '#ad2121',secondary: '#FAE3E3',},blue: {primary: '#1e90ff',secondary: '#D1E8FF',},yellow: {primary: '#e3bc08',secondary: '#FDF1BA',},};


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  
})
export class PlannerComponent implements OnInit {
  // eosAddEventForm: FormGroup;
  eosAddEventForm:FormGroup
  eosAddEventFormCustom:FormGroup
  space_req_Form:FormGroup
  file_Form:FormGroup
  submitted = false;
  recurrring_visibleDivision:boolean = false;

  filterData=[];
  statuslists = [];
  selectdata=[];
  typeData=[];
  modeData=[];
  counts;
  plannerData = []; 

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  
  courseType:any = {};
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  
  events: CalendarEvent[] = [
  ];

  activeDayIsOpen: boolean = true;
  showAll = false;


  

  constructor(private modal: NgbModal,private _serve:ConfigService,private formBuilder: FormBuilder) {}
 


  ngOnInit(): void {
  // "fkSubscriberEventTypeId":{"id":"9200e5e6-7c67-11e3-ab65-005056a93afd","name":null,"fkDefaultEventFrequencyTypeId":null},"fkEventFrequencyTypeId":{"id":"1","name":"one time"},

  this.eosAddEventForm = this.formBuilder.group({
    s_eventName: ['', Validators.required],
    s_startDate: ['', Validators.required],
    s_startTime: [null, Validators.required],
    s_courseType:  ['', Validators.required],
    s_endDate: ['', Validators.required],
    s_endTime: [null, Validators.required],
    s_notes: ['', Validators.required],

    id: ['', Validators.required],
    name: ['', Validators.required],
    notes: ['', Validators.required],
    occupancy: ['', Validators.required],
    startDt: [null, Validators. required],
    endDt: [null, Validators.required],
    startHour: [null, Validators.required],
    endHour: [null, Validators.required],
    seriesEnd: ['', Validators.required],
    frequency: ['', Validators.required],
    misc: ['', Validators.required],
    location: this.formBuilder.array([]),
  });


  this.eosAddEventFormCustom = this.formBuilder.group({
    c_eventName: ['', Validators.required],
    c_startDate: ['', Validators.required],
    c_startTime: ['', Validators.required], 
    c_location: ['', Validators.required],
    c_mode: ['', Validators.required],
    c_endDate: ['', Validators.required],
    c_endTime: ['', Validators.required],
    c_notes: ['', Validators.required], 
  });
 

    this.space_req_Form = new FormGroup({
       'f_location': new FormControl(null,Validators.required),
      'f_mode': new FormControl(null,Validators.required),
      'f_minTemp': new FormControl(null,Validators.required),
      'f_humid': new FormControl(null,Validators.required),
      'f_maxtemp': new FormControl(null,Validators.required),
      'f_freshAir': new FormControl(null,Validators.required),
    });

    this.file_Form = new FormGroup({
      'f_fileUpload': new FormControl(null,Validators.required),
    });        
  
  

    
    this._serve.onDisplayEvents().subscribe( eventListData =>  
      {
      ////console.log("eventListData ", eventListData);
        this.plannerData = eventListData;
       // this.filterData.unshift({id:52, name: "Show All Spaces"});
        for(let i=0;i<eventListData.length;i++)
        {
            var obj:any =  {}
            obj.title = eventListData[i].name;
            obj.id = eventListData[i].id; 
            obj.start = new Date(moment(eventListData[i].startDt + '' + eventListData[i].startHour, "DD/MM/YYYY hh:mm").startOf('day')) 
            obj.end = new Date(moment(eventListData[i].endDt+ '' + eventListData[i].endHour, "DD/MM/YYYY hh:mm")); 
            this.events.push(obj);
        } 
        this.refresh.next(); 
      })  
      
    this._serve.onFilterBySpaces().subscribe(filterRes => {
      this.filterData = filterRes;
      console.log('filter data', filterRes);
    });

    this._serve.onLocationService().subscribe(data => {
        
        this.selectdata=data;
        ////console.log(data);
    });

    this._serve.onTypeDataService().subscribe(data1 => {
        
        this.typeData=data1;
       console.log('type data',data1);
    });
    this._serve.onModeDataService().subscribe(data2 => {
        
        this.modeData=data2;
       ////console.log(data2);
    });



 
  }
    //event handler for the select element's change event
    selectChangeHandler (event: any) {
      //update the ui
      this.filterData = event.target.value;
    }
  
  //Recurring Check box header...
  onRecurranceEvents()
  {
    this._serve.onDisplayEvents().subscribe( response => {
      console.log("eventsdata",response)
    })
  }
   ////console.log("space.fkSpaceId.id == deviceValue ", space.fkSpaceId.id == deviceValue);  this will come in return...
    onChange(deviceValue) { 
 
      var plannerFiltered = this.plannerData.filter(item=>{
        // I am finding data label by using permission label.
        var spaceList = item.spaceEventSet.filter(space=>
          { return space.fkSpaceId.id == deviceValue;
           })
 
        if (spaceList.length>0) {
          return true;
        }
         
      }) 
      this.events = []
      for(let i=0;i<plannerFiltered.length;i++)
        {
            var obj:any =  {}
            obj.title = plannerFiltered[i].name;
            obj.id = plannerFiltered[i].id;
            obj.start = new Date(moment(plannerFiltered[i].startDt + '' + plannerFiltered[i].startHour, "DD/MM/YYYY hh:mm")) 
            obj.end = new Date(moment(plannerFiltered[i].endDt+ '' + plannerFiltered[i].endHour, "DD/MM/YYYY hh:mm")); 
            this.events.push(obj);
        } 
        this.refresh.next();
    }


// convenience getter for easy access to form fields
get formValues() { return this.eosAddEventForm.controls; }
get formValuesCustom() { return this.eosAddEventFormCustom.controls; }

onSubmit() {
    this.submitted = true;
    console.log('eosAddEventForm', JSON.stringify(this.eosAddEventForm.value));
    var reqObj = {}
    var courseType:any = this.typeData.filter((item:any)=> {
      return item.id ==  this.eosAddEventForm.value.s_courseType;
    })
    console.log('courseType', courseType)
    reqObj["id"] = null
    reqObj["name"] = this.eosAddEventForm.value.name
    reqObj["notes"] = this.eosAddEventForm.value.notes
    reqObj["occupancy"] = this.eosAddEventForm.value.occupancy
    reqObj["startDt"] = this.eosAddEventForm.value.startDt
    reqObj["endDt"] = this.eosAddEventForm.value.endDt
    reqObj["startHour"] = new Date(this.eosAddEventForm.value.startHour).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    reqObj["endHour"] = new Date(this.eosAddEventForm.value.endHour).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    reqObj["seriesEnd"] = this.eosAddEventForm.value.seriesEnd
    reqObj["frequency"] = this.eosAddEventForm.value.frequency
    reqObj["misc"] = this.eosAddEventForm.value.misc
    reqObj["fkSubscriberEventTypeId"] = {
      id: courseType.id,
      name: null,
      fkDefaultEventFrequencyTypeId: null
    }
    reqObj["spaceEventSet"] = [];
    var location = [];
    this.eosAddEventForm.value.location.forEach((item)=> {
      var obj:any = {
        id: null,
        fkSpaceId: {
          id: item.id,
          name: null
        }
      };
      reqObj["spaceEventSet"].push(obj);
      location.push(item.name);
    })
    reqObj["auditDetails"] = {
      Type: courseType.name,
      Recurring: '',
      Notes: this.eosAddEventForm.value.notes,
      RecurEnd: this.eosAddEventForm.value.seriesEnd,
      Start: `${this.eosAddEventForm.value.startDt} ${reqObj["endHour"]}`,
      Name: this.eosAddEventForm.value.name,
      End: `${this.eosAddEventForm.value.endDt} ${reqObj["endHour"]}`,
      Locations: location.toString()    
    }

    // this._serve.onAddlistEvent(reqObj).subscribe ( response => {
    //   // this.filterData.unshift({id:52, name: "Show All Spaces"});
    //   this.plannerData = response;
    //   for(let i=0;i<response.length;i++)
    //   {
    //       var obj:any =  {}
    //       obj.title = response[i].name;
    //       obj.id = response[i].id; 
    //       obj.start = new Date(moment(response[i].startDt + '' + response[i].startHour, "DD/MM/YYYY hh:mm").startOf('day')) 
    //       obj.end = new Date(moment(response[i].endDt+ '' + response[i].endHour, "DD/MM/YYYY hh:mm")); 
    //       this.events.push(obj);
    //   } 
    //   this.refresh.next(); 
    // })

    console.log('reqObj', JSON.stringify(reqObj));

    // stop here if form is invalid
    if (this.eosAddEventForm.invalid) {
      //   Swal.fire({
      //   title: 'Invalid Entry',
      //   text: 'Please enter a name for the event',
      //   icon: 'warning',
      //   customClass: {container: 'confirmName'},
      // // showCancelButton: true,
      //   confirmButtonText: 'Ok', 
      // })
      return;
    } 
    else
    {
      alert(JSON.stringify(this.eosAddEventForm.value, null, 4));
      //this.plannerData =  this.eosAddEventForm.value;
      //console.log("the values are standard" + JSON.stringify(this.eosAddEventForm.value, null, 4))
    }
 
}

onReset() {
    this.submitted = false;
    this.eosAddEventForm.reset();
}



//custom form
onSubmits(modalContent) {
  this.submitted = true;
  if (this.eosAddEventFormCustom.invalid) {
      return;
  } 
  else
  {
    alert(JSON.stringify(this.eosAddEventFormCustom.value, null, 4)); 
  }

}

onResetCustom() {
  this.submitted = false;
  this.eosAddEventFormCustom.reset();
}

getDefaultSpace(e) {
  var self = this;
  console.log('courseType',JSON.stringify(this.courseType));
  // self._serve.getdefaultSpaces(e.target.value).subscribe((res:any)=> {
  //   console.log('res', JSON.stringify(res));
  // })
}


    //add event popoup recurring checkbox
  onRecurrring()
  {
    this.recurrring_visibleDivision = !this.recurrring_visibleDivision
  }
 
    onSubmit_space_req(){
       alert(JSON.stringify(this.space_req_Form.value, null, 4));
    }
    onSubmit_file(){
      alert(JSON.stringify(this.file_Form.value, null, 4));
    }


 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //console.log("dayClicked ");

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      
    }
    // this.modal.open(this.modalContent,);

  }

  pushLocation(data:any, isChecked: boolean) {
    const location = <FormArray>this.eosAddEventForm.controls.location;
  
    if(isChecked) {
      location.push(new FormControl(data));
    } else {
      let index = location.controls.findIndex((x:any) => x.id == data.id)
      location.removeAt(index);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
 //console.log("event ", event);
 //console.log("action ", action);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(date: Date): void {
    // this.events.push({
    //   start: date,
    //   title: 'New event',
    //   color: colors.red,
    // });
    var event = {
      start: date,
      title: 'New event',
      color: colors.red,
    }
    var action = "add"
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
   // this.refresh.next();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  open(modalContent){
     this.modal.open(modalContent, { centered: true});
  }

  getEventColor(value) {
    switch(value) {
      case 44:{
        return '5px solid blue';
      }
      
      case 31:
        {
          return '5px solid red';
        }
        
      default:
        return '5px solid yellow';
    }
// switch (value) {
	
//    default: {
//       //console.log("Invalid choice");
//       break;
//    }
// }
  }
  

}
