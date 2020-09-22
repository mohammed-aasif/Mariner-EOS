import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerComponent } from '../app/components/planner/planner.component';
// import { ScheduleModule, RecurrenceEditorModule,DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService,TimelineViewsService,TimelineMonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { AsideComponent } from '../app/components/aside/aside.component'
import { CtrlPointsComponent } from '../app/components/ctrl-points/ctrl-points.component';
import { StatusComponent } from '../app/components/status/status.component';
//  import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns'
//  import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';



//  import { NgxTuiCalendarModule } from 'ngx-tui-calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ContextMenuModule } from 'ngx-contextmenu';
// import { NgbModule } from '@ng-boots trap/ng-bootstrap';


import { HttpClientModule,HttpHeaders  } from '@angular/common/http'

// RECOMMENDED
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ReactiveFormsModule } from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';
 
@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    AsideComponent,
    CtrlPointsComponent,
    StatusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    // BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DpDatePickerModule ,
    // ScheduleModule,
    // TimePickerModule,
    // RecurrenceEditorModule ,
    // DropDownListModule,
    // NgxTuiCalendarModule,
    TabsModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ContextMenuModule.forRoot()
    // NgbModule
    
  ],
  providers: [  
    // MonthService,
    // AgendaService,
    // MonthAgendaService,DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService,TimelineViewsService,TimelineMonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
