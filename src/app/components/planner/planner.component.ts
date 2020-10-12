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
  monthArray = [];
  weekdays:any =[];
  recurringTab:string = 'Daily'
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
  
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  showAll = false;
  defaultSpace:any =[];
  defaultModes:any =[];
  requirements: any = [];
  requirementObj: any = {};

  mode:any ={};

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
    occupancy: [0, Validators.required],
    startDt: [null, Validators. required],
    endDt: [null, Validators.required],
    startHour: [null, Validators.required],
    endHour: [null, Validators.required],
    seriesEnd: ['', Validators.required],
    frequency: [0, Validators.required],
    misc: ['', Validators.required],
    location: this.formBuilder.array([]),
    recurring: [null, Validators.required],
    daily: [null],
    monthday: [null],
    reqcurrenceEnd: [null]
  });


  this.eosAddEventFormCustom = this.formBuilder.group({
    c_eventName: ['', Validators.required],
    c_startDate: ['', Validators.required],
    c_startTime: ['', Validators.required], 
    c_location: ['', Validators.required],
    c_mode: [''],
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

    this.monthArray = [  'January' , 'February','March' , 'April','May' , 'June','July' , 'August','September' , 'October','November' , 'December' ]

    var date = new Date();
    
    //initillay displaying event list in day view.....

    // this._serve.onDisplayEvents(startDate,endDate).subscribe( eventListData =>  
    //   {
    //     this.plannerData = eventListData;
    //    // this.filterData.unshift({id:52, name: "Show All Spaces"});
    //     for(let i=0;i<eventListData.length;i++)
    //     {
    //         var obj:any =  {}
    //         obj.title = eventListData[i].name;
    //         obj.id = eventListData[i].id; 
    //         obj.start = new Date(moment(eventListData[i].startDt + '' + eventListData[i].startHour, "DD/MM/YYYY hh:mm")) 
    //         obj.end = new Date(moment(eventListData[i].endDt+ '' + eventListData[i].endHour, "DD/MM/YYYY hh:mm")); 
    //         this.events.push(obj);
    //     } 
    //     this.refresh.next(); 
    //   }) 

    //initillay displaying event list in day view.....
    this.closeOpenMonthViewDay(date)
  
      
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
 
    //end OnInit
  }

 
  // month change prev and next button clicks ...
  closeOpenMonthViewDay(viewDate) {
     var startOfMonth = moment(viewDate).startOf('month').format('DD/MM/YYYY');
    console.log("StartMonth Console",startOfMonth)
    var endOfMonth   = moment(viewDate).endOf('month').format('DD/MM/YYYY');
    console.log("EndMonth Console",endOfMonth);
    this.getmonthData(startOfMonth,endOfMonth);
    this.activeDayIsOpen = false;
  }

     getmonthData(startDate,endDate)
    {
       this._serve.onDisplayEvents(startDate,endDate).subscribe( eventListData =>  
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
            obj.start1 = new Date(moment( eventListData[i].startHour, "DD/MM/YYYY hh:mm")) 
            obj.end1 = new Date(moment( eventListData[i].endHour, "DD/MM/YYYY hh:mm")); 
            this.events.push(obj);
        } 
        this.refresh.next(); 
      })  
    }
//End  month change prev and next button clicks ...
    

    // Edit event (CRUD).....
    onEditEvent(i)
    {
      console.log("iiiiiiiii",i)
    }

    //event handler for the select element's change event
    selectChangeHandler (event: any) {
      //update the ui
      this.filterData = event.target.value;
    }
  
  //Header Recurring Check box...
  onDisplayRecurranceCheck(e)
  { 
    
    if(e.target.checked == true)
    {
      console.log("works")
    }
    else
    {
      console.log("not works")
    }
  }
  // }
  //End Header Recurring Check box...

 
  // upload csv file
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
    // var reader = new FileReader();

    // reader.readAsText(file);
    // reader.onload = (event: any) => {
    //   var csv = event.target.result; // Content of CSV file
    //   console.log(csv);
    // }
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
    var reqObj = [{}]
    var courseType:any = this.typeData.filter((item:any)=> {
      return item.id ==  this.eosAddEventForm.value.s_courseType;
    })
    console.log('courseType', courseType)
    reqObj[0]["id"] = null
    reqObj[0]["name"] = this.eosAddEventForm.value.name
    reqObj[0]["notes"] = this.eosAddEventForm.value.notes
    reqObj[0]["occupancy"] = this.eosAddEventForm.value.occupancy
    reqObj[0]["startDt"] = this.formatDate(this.eosAddEventForm.value.startDt);
    reqObj[0]["endDt"] = this.formatDate(this.eosAddEventForm.value.endDt);
    reqObj[0]["startHour"] = new Date(this.eosAddEventForm.value.startHour).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    reqObj[0]["endHour"] = new Date(this.eosAddEventForm.value.endHour).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    reqObj[0]["seriesEnd"] = this.eosAddEventForm.value.seriesEnd ? this.eosAddEventForm.value.seriesEnd: null;
    reqObj[0]["frequency"] = this.eosAddEventForm.value.frequency
    reqObj[0]["misc"] = this.eosAddEventForm.value.misc
    reqObj[0]["fkSubscriberEventTypeId"] = {
      id: courseType[0].id,
      name: null,
      fkDefaultEventFrequencyTypeId: null
    }
    reqObj[0]["spaceEventSet"] = [];
    var location = [];
    this.eosAddEventForm.value.location.forEach((item)=> {
      var obj:any = {
        id: null,
        fkSpaceId: {
          id: item.id,
          name: null
        }
      };
      reqObj[0]["spaceEventSet"].push(obj);
      location.push(item.name);
    })
    reqObj[0]["auditDetails"] = {
      Type: courseType.name,
      Recurring: '',
      Notes: this.eosAddEventForm.value.notes,
      RecurEnd: this.eosAddEventForm.value.reqcurrenceEn? this.formatDate(this.eosAddEventForm.value.reqcurrenceEnd): "",
      Start: `${this.formatDate(this.eosAddEventForm.value.startDt)} ${reqObj[0]["startHour"]}`,
      Name: this.eosAddEventForm.value.name,
      End: `${this.formatDate(this.eosAddEventForm.value.endDt)} ${reqObj[0]["endHour"]}`,
      Locations: location.toString()    
    }
    reqObj[0]['fkEventFrequencyTypeId']= {id: "1", name: "one time"}
    if (this.eosAddEventForm.value.recurring) {
      if (this.recurringTab =='Daily' && this.eosAddEventForm.value.daily == 'daily') {
        reqObj[0]['fkEventFrequencyTypeId']= {id: "2", name: "daily"};
      } else if (this.recurringTab =='Daily' && this.eosAddEventForm.value.daily == 'monday to friday') {
        reqObj[0]['fkEventFrequencyTypeId']= {id: "3", name: "monday to friday"}
      } else if (this.recurringTab == 'Weekly') {
        reqObj[0]['fkEventFrequencyTypeId']= {id: "4", name: "weekly"}
        reqObj[0]['frequency']= this.weekdays.location.toString();       
      } else if (this.recurringTab == 'Monthly') {
        reqObj[0]['fkEventFrequencyTypeId']= {id: "5", name: "monthly"}
        reqObj[0]['frequency']= this.eosAddEventForm.value.monthday;
      }
      
    }

    console.log('reqObj[0]====>', reqObj);
    this._serve.onAddlistEvent(reqObj).subscribe ( response => {
      console.log("aasif",response)
      this.closeOpenMonthViewDay(new Date());
      this.modal.dismissAll()
      // this.plannerData = response;
      // for(let i=0;i<response.length;i++)
      // {
      //     var reqObj:any =  {}
      //     reqObj.title = reqObj[0].name;
      //     reqObj.id = response[i].id; 
      //     reqObj.start = new Date(moment(this.formatDate(this.eosAddEventForm.value.startDt) + '' + reqObj[0]["startHour"], "DD/MM/YYYY hh:mm")) 
      //     reqObj.end = new Date(moment(this.formatDate(this.eosAddEventForm.value.endDt)+ '' + reqObj[0]["endHour"], "DD/MM/YYYY hh:mm")); 
      //     this.events.push(reqObj);
      // // } 
      // this.refresh.next(); 
    })

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

getmodes(e:any) {
  this._serve.getDefaultModes(e.target.value).subscribe((res:any)=> {
    console.log('getmodes', res);
    this.defaultModes = res;
  })
}

onSelect(data: any): void {
  this.recurringTab = data.heading;
  console.log('this.recurringTab', this.recurringTab)
}

formatDate (dateStr) {
  var datePart = dateStr.split("-"),
  year = datePart[0], // get only two digits
  month = datePart[1], day = datePart[2];

  return day+'/'+month+'/'+year;
}


onReset() {
    this.submitted = false;
    this.eosAddEventForm.reset();
}

selectedModes(val:any) {
  var data = this.defaultModes.filter((item:any)=> val ==item.id);
 console.log("data ", data);
 this.requirements = [];
 this.requirementObj = {}
 data[0].spaceModeRequirementSet.forEach((item)=> {
   var obj:any = {};
   obj.key = item.fkRequirementTypeId.name;
   obj.value = item.value;
   this.requirementObj[obj.key] = {
    id: item.id,
    rampRate: item.rampRate,
    value: item.value,
    fkRequirementTypeId: {
      id: item.fkRequirementTypeId.id,
      name: item.fkRequirementTypeId.name
    }
   };
  this.requirements.push(obj);
 })

}



//custom form
onSubmits(modalContent) {
  var self = this;
  this.submitted = true;
  if (this.eosAddEventFormCustom.invalid) {
      return;
  } 
  else
  {
    // alert(JSON.stringify(this.eosAddEventFormCustom.value, null, 4)); 
    console.log('this.eosAddEventFormCustom.value', this.eosAddEventFormCustom.value);

 console.log("requirementObj ", self.requirementObj);
 var reqObj = [{}]
 var mode:any = this.defaultModes.filter((item:any)=> {
   return item.id ==  this.eosAddEventFormCustom.value.c_mode;
 })
 var location:any = this.filterData.filter((item:any)=> {
  return item.id ==  this.eosAddEventFormCustom.value.c_location;
})
  var selectedRequirement:any = [];
  Object.keys(self.requirementObj).forEach(function(key) {
 console.log("key ", key);
    selectedRequirement.push(self.requirementObj[key]);
  });
  var spaceModeSet = [];
  spaceModeSet.push({
    id: mode[0].id,
    name: mode[0].name,
    spaceModeRequirementSet: selectedRequirement
  })
 console.log('mode===>', mode)
 reqObj[0]["id"] = null
 reqObj[0]["name"] = self.eosAddEventFormCustom.value.c_eventName
 reqObj[0]["notes"] = self.eosAddEventFormCustom.value.c_notes
 reqObj[0]["occupancy"] = 0
 reqObj[0]["startDt"] = self.formatDate(self.eosAddEventFormCustom.value.c_startDate);
 reqObj[0]["endDt"] = self.formatDate(self.eosAddEventFormCustom.value.c_endDate);
 reqObj[0]["startHour"] = new Date(self.eosAddEventFormCustom.value.c_startTime).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
 reqObj[0]["endHour"] = new Date(self.eosAddEventFormCustom.value.c_endTime).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
 reqObj[0]["seriesEnd"] = null;
 reqObj[0]["frequency"] = 0;
 reqObj[0]["misc"] = null;
 reqObj[0]["fkSubscriberEventTypeId"] = null;
 reqObj[0]["spaceEventSet"] = [];
 reqObj[0]['spaceEventSet'].push({
   id: null,
   fkSpaceId: {
    id: location[0].id,
    name: location[0].name,
    spaceModeSet: spaceModeSet
   }
 })

 reqObj[0]["auditDetails"] = {
  Mode: mode[0].name,
   Notes: this.eosAddEventFormCustom.value.c_notes,
   Start: `${this.formatDate(this.eosAddEventFormCustom.value.c_startDate)} ${reqObj[0]["startHour"]}`,
   Name: this.eosAddEventFormCustom.value.c_eventName,
   End: `${this.formatDate(this.eosAddEventFormCustom.value.c_endDate)} ${reqObj[0]["endHour"]}`,
   Locations: location[0].name,
   Requirements: ''    
 }
 reqObj[0]['fkEventFrequencyTypeId']= {id: "1", name: "one time"}

 console.log('reqObj[0]====>', JSON.stringify(reqObj));
 this._serve.onAddlistEvent(reqObj).subscribe ( response => {
  console.log("aasif",response)
  this.closeOpenMonthViewDay(new Date());
  this.modal.dismissAll()
})
  }

}

onResetCustom() {
  this.submitted = false;
  this.eosAddEventFormCustom.reset();
}

getDefaultSpace(e) {
  console.log('courseType',e.target.value);
  this._serve.getdefaultSpaces(e.target.value).subscribe((res:any)=> {
    console.log('res', res);
    this.defaultSpace = res;
    const location = <FormArray>this.eosAddEventForm.controls.location;
    this.defaultSpace.forEach((item:any)=> {
      location.push(new FormControl(item));
    })
  })
}

locationChecked(id:any) {
  const location = <FormArray>this.eosAddEventForm.controls.location;
  var data = this.defaultSpace.filter((item:any)=> {
    return item.id == id;
  })
  return data.length>0 ? true: false;
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

  pushWeekDays(val:number, isChecked: boolean) {
    this.weekdays =[];
  
    if(isChecked) {
      this.weekdays.push(val);
    } else {
      let index = this.weekdays.findIndex((x:any) => x == val)
      this.weekdays.removeAt(index);
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
