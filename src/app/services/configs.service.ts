import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  api_Url = '/dashboard/external/secure/dashboardService';
  constructor(private http:HttpClient) { }
 
  /***********************************************PLANNER PAGE********************************************************** */
  //filter by space select option
  onFilterBySpaces():Observable<any>
  {
        return this.http.get('/dashboard/external/secure/dashboardService/events/spaces');
  }

  //display event list in calendar
  onDisplayEvents():Observable<any>
  { 
       return this.http.get('/dashboard/external/secure/dashboardService/events?startDate=01/09/2020&endDate=30/09/2020');
  }
//CONTROL POINT PAGE
  
   // control point select option
   onControlListOptions():Observable<any>
   {
     let httpParams = new HttpParams({
       fromObject:
       {
         widgetType : 'setpoints',
       }
     }) ;
     return this.http.get(this.api_Url+'/widgets/getLayouts',{params:httpParams})
   }
 
   // control point description list
   onControlDescriptionList(widgetId):Observable<any>
   {
     return this.http.get(this.api_Url+'/widgets/getLayout?id=' + widgetId)
   }

  //STATUS PAGE 

  //status page initially displaying list
  onStatusService():Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/status/get')
  }

  // status setting click list options --> popup
  onStatusManufact(widgetId:any):Observable<any>
  {
    return this.http.get(this.api_Url+'/status/devicerw?widgetId='+widgetId);
  }

    // status optimization  --> popup switch toggle
    onUpdateStatus(data:any, status)
    {

      return this.http.post(this.api_Url+'/widgets/enableControllableStatus?id='+ data.id +'&status='+ status,status);
    }

    

  //status optimization click list option --> popup
  onStatusOptimization(id:any):Observable<any>
  {
    return this.http.get(this.api_Url+'/widgets/getLayout?id='+id)
  }

  /***********************************************GRAPHIC PAGE********************************************************** */
  //for graphics page
  onGetGraphicsDetails():Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/bowl/data')
  }

}



