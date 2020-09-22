import { Component,ViewChild, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { ContextMenuComponent } from 'ngx-contextmenu';

import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { ConfigService } from '../../services/configs.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
 // import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-watch.validator';
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
    // {
    //   start: subDays(startOfDay(new Date()), 30),
    //   end: addDays(new Date(),30),
    //   //startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //   beforeStart: true,
    //   afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 30),
    //   end: addDays(new Date(), 30),
    //   title: 'Seeni',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 30),
    //   end: addDays(new Date(), 30),
    //   title: 'Test',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 30),
    //   end: addDays(new Date(), 30),
    //   title: 'Praveen',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 30),
    //   end: addDays(endOfMonth(new Date()), 30),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 30),
    //   end: addHours(new Date(),30),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;
  showAll = false;


  

  constructor(private modal: NgbModal,private _serve:ConfigService,private formBuilder: FormBuilder) {}
 


  ngOnInit(): void {
     //for adding buttons 
  //   $('document').ready(function(){

  //    //add button
  //     $(".cal-cell.cal-day-cell ").append("<button class='addSchedule'>+</button>");
      
  
  //     $(".cal-cell.cal-day-cell  ").mouseover(function()
  //     {
  //       $(this).find('.addSchedule').css('display','block')
      
  //     });
  //     $(".cal-cell.cal-day-cell  ").mouseout(function()
  //     {
  //       $('.addSchedule').css('display','none');
      
  //     }); 
   
  //  });
   

  this.eosAddEventForm = this.formBuilder.group({
    s_eventName: ['', Validators.required],
    s_startDate: ['', Validators.required],
    s_startTime: ['', Validators.required],
    s_courseType: ['', Validators.required],
    s_endDate: ['', Validators.required],
    s_endTime: ['', Validators.required],
    s_notes: ['', Validators.required],
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


    // this.eosAddEventForm = new FormGroup({
    //   's_eventName': new FormControl('',[Validators.required]),
    //   's_startDate': new FormControl('',[Validators.required]),
    //   's_startTime': new FormControl('',[Validators.required]),
    //   's_courseType': new FormControl('lightAgency',[Validators.required]),
    //   's_endDate': new FormControl('',[Validators.required]),
    //   's_endTime': new FormControl('',[Validators.required]),
    //   's_notes': new FormControl('',[Validators.required]),
    //   'c_eventName': new FormControl('',[Validators.required]),
    //   'c_startDate': new FormControl('',[Validators.required]),
    //   'c_startTime': new FormControl('',[Validators.required]),
    //   'c_location': new FormControl('BLDGA - 24/7',[Validators.required]),
    //   'c_mode': new FormControl('BLDGA - 24/7 - occupied',[Validators.required]),
    //   'c_endDate': new FormControl('',[Validators.required]),
    //   'c_endTime': new FormControl('',[Validators.required]),
    //   'c_notes': new FormControl('',[Validators.required]),
    // });

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
 
    



     
    //this._serve.onStatusService().subscribe(statuslistsData =>this.products = statuslistsData)
  
    this._serve.onDisplayEvents().subscribe( eventListData =>  
      {
    console.log("eventListData ", eventListData);
        this.plannerData = eventListData;


       // this.filterData.unshift({id:52, name: "Show All Spaces"});
         
          
         
        for(let i=0;i<eventListData.length;i++)
        {
             
            var obj:any =  {}

            obj.title = eventListData[i].name;
            obj.id = eventListData[i].id;
            obj.start = new Date(moment(eventListData[i].startDt + '' + eventListData[i].startHour, "DD/MM/YYYY hh:mm")) 
            obj.end = new Date(moment(eventListData[i].endDt+ '' + eventListData[i].endHour, "DD/MM/YYYY hh:mm")); 
            this.events.push(obj);
              // console.log("Total Events" ,obj);
        } 
        this.refresh.next(); 
      }
      )  

 
    this._serve.onFilterBySpaces().subscribe(filterRes => {
//  console.log("filterRes ", filterRes);
      this.filterData = filterRes;
    });

    this._serve.onLocationService().subscribe(data => {
        
        this.selectdata=data;
        //console.log(data);
    });

    this._serve.onTypeDataService().subscribe(data1 => {
        
        this.typeData=data1;
       //console.log(data1);
    });
    this._serve.onModeDataService().subscribe(data2 => {
        
        this.modeData=data2;
       //console.log(data2);
    });


  }
    //event handler for the select element's change event
    selectChangeHandler (event: any) {
      //update the ui
      this.filterData = event.target.value;
    }
  
  onRecurranceEvents()
  {
    
  }
   //console.log("space.fkSpaceId.id == deviceValue ", space.fkSpaceId.id == deviceValue);  this will come in return...
    onChange(deviceValue) { 
 
      var plannerFiltered = this.plannerData.filter(item=>{
        // I am finding data label by using permission label.
        var spaceList = item.spaceEventSet.filter(space=>{ return space.fkSpaceId.id == deviceValue; })
 
        if (spaceList.length>0) {
          console.log("spaceList ", spaceList)
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
            console.log("Total Events" ,obj); 
        } 
        this.refresh.next();
    }



// convenience getter for easy access to form fields
get formValues() { return this.eosAddEventForm.controls; }
get formValuesCustom() { return this.eosAddEventFormCustom.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eosAddEventForm.invalid) {
        return;
    } 
    else
    {
      alert(JSON.stringify(this.eosAddEventForm.value, null, 4));
      console.log("the values are standard" + JSON.stringify(this.eosAddEventForm.value, null, 4))
    }
 
}

onReset() {
    this.submitted = false;
    this.eosAddEventForm.reset();
}



//custom form
onSubmits() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.eosAddEventFormCustom.invalid) {
      return;
  } 
  else
  {
    alert(JSON.stringify(this.eosAddEventFormCustom.value, null, 4));
    console.log("the values are customs" + JSON.stringify(this.eosAddEventFormCustom.value, null, 3))
  }

}

onResetCustom() {
  this.submitted = false;
  this.eosAddEventFormCustom.reset();
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
  console.log("dayClicked ");

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
 console.log("event ", event);
 console.log("action ", action);
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
      case "acc36d70-ee04-11ea-a5af-000c2930f1f3":{
        return '5px solid purple';
      }
      case  "e3fce390-f46f-11ea-8620-000c2930f1f3":{
        return '5px solid purple';
      }
      case  "7628b2c0-ee04-11ea-a5af-000c2930f1f3": {
        return '5px solid green';
      }
      case 1408:
        return '5px solid red';
      default:
        return '5px solid yellow';
    }
// switch (value) {
	
//    default: {
//       console.log("Invalid choice");
//       break;
//    }
// }
  }
  

}
