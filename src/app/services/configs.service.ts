import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


   private _spacesURL = 'assets/api/spaces.json'
   private _evenListURL = 'assets/api/eventlist.json';
   private _popupSelectURL = 'assets/api/locationselectoption.json';
   private _popupTypeURL = 'assets/api/typeselectoption.json';
   private _popupModeURL = 'assets/api/modeselectoption.json';
   private _status = 'assets/api/status.json';
   
  
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
//popup location select option
 onLocationService():Observable<any>
  {
    return this.http.get(this._popupSelectURL)
  }

  // popup type select option
 onTypeDataService():Observable<any>
  {
    return this.http.get(this._popupTypeURL)
  }

  // popup mode select option
   onModeDataService():Observable<any>
  {
    return this.http.get(this._popupModeURL)
  }
  /***********************************************CONTROL POINT PAGE********************************************************** */
   // control point select option
   onControlListOptions():Observable<any>
   {
     let httpParams = new HttpParams({
       fromObject:
       {
         widgetType : 'setpoints',
       }
     }) ;
     return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayouts',{params:httpParams})
   }
 
   // control point description list
   onControlDescriptionList(widgetId):Observable<any>
   {
     return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayout?id=' + widgetId)
   }

  /***********************************************STATUS PAGE********************************************************** */

  //status page initially displaying list
  onStatusService():Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/status/get')
  }

  // status setting click list options --> popup
  onStatusManufact(widgetId:any):Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/status/devicerw?widgetId='+widgetId);
  }

    // status optimization  --> popup switch toggle
    onUpdateStatus(data:any, status)
    {

      return this.http.post('/dashboard/external/secure/dashboardService/widgets/enableControllableStatus?id='+ data.id +'&status='+ status,status);
    }

    

  //status optimization click list option --> popup
  onStatusOptimization(id:any):Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayout?id='+id)
  }

  /***********************************************GRAPHIC PAGE********************************************************** */
  //for graphics page
  onGetGraphicsDetails():Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/bowl/data')
  }

}



