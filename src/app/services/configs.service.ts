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
 

  //filter by space select option
  onFilterBySpaces():Observable<any>
  {
        return this.http.get('/dashboard/external/secure/dashboardService/events/spaces');
        //return this.http.get(this._spacesURL)
         
  }

  //display event list in calendar
  onDisplayEvents():Observable<any>
  { 
 
       // let params = new HttpParams().set("startDate",'').set("endDate", '');  
       // return this.http.get('/dashboard/external/secure/dashboardService/events/{{startDate}}/{{endDate}}',{params});
       return this.http.get('/dashboard/external/secure/dashboardService/events?startDate=01/09/2020&endDate=30/09/2020');
       // return this.http.get(this._evenListURL);
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

  //status page
  onStatusService():Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/status/get')
  }

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

    // let httpParams = new HttpParams({
    //   fromObject:
    //   {
    //     id : 'Parent_Widget1_ID',
    //   }
    // }) ;

    // http://eos.stg2app01.mariner.local:8080/Dashboard/secure/dashboardService/widgets/getLayout?id=Parent_Widget1_ID
 
    return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayout?id=' + widgetId)
  }

  // status setting click list options --> popup

  onStatusManufact(id:any):Observable<any>
  {
    return this.http.get('/dashboard/external/secure/dashboardService/status/devicerw?widgetId='+id);
  }

  //status optimization click list option --> popup
  onStatusOptimization(id:any):Observable<any>
  {
      return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayout?id='+id)
    //return this.http.get('/dashboard/external/secure/dashboardService/widgets/getLayout?id=EOS%20Level%20000%20Offices')
  }
}



