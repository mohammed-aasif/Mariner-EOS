import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {


   private _spacesURL = 'assets/api/spaces.json'
   private _evenListURL = 'assets/api/eventlist.json';
   private _popupSelectURL = 'assets/api/locationselectoption.json';
   private _popupTypeURL = 'assets/api/typeselectoption.json';
   private _popupModeURL = 'assets/api/modeselectoption.json';

  constructor(private http:HttpClient) { }
 
  //filter by space select option
  onFilterBySpaces():Observable<any>
  {
        //const headers   = {
        //  'Accept': '*/*',
        //  'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        //  ' Connection': 'keep-alive' ,
        //  ' Access-Control-Allow-Origin': '*', 
        //  ' Cookie': 'JSESSIONIDSSO=2toVTHZ45jgyRd-dI46zcoDvNVM7HejIwXA--Z9T; JSESSIONID=NlcB4-vjiFp_jaFtspjnWcGmlJeCgODWRvXVogTc.stg2app01 ',
        //   //' Host': 'eos.stg2app01.mariner.local:8080' ,
        //  ' Referer': 'http://eos.stg2app01.mariner.local:8080/dashboard/legacy/secure/index.html' ,
        //  ' User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36' ,
        //  ' X-Requested-With': 'ShockwaveFlash/32.0.0.433' ,
        //  ' Content-Type': 'application/json'
        //  }

        //  const requestOptions = {                                                                                                                                                                                 
        //   headers: new Headers(headerDict), 
        // };



        // var headers = new Headers();
        // headers.append('Accept', '*/*');
        // headers.append('Accept-Language', 'en-GB,en-US;q=0.9,en;q=0.8');
        // headers.append( ' Connection', 'keep-alive');
        // headers.append(' Access-Control-Allow-Origin', '*');
        // headers.append( ' Cookie', 'JSESSIONIDSSO=2toVTHZ45jgyRd-dI46zcoDvNVM7HejIwXA--Z9T; JSESSIONID=NlcB4-vjiFp_jaFtspjnWcGmlJeCgODWRvXVogTc.stg2app01 ',);
        // headers.append( ' Referer', 'http://eos.stg2app01.mariner.local:8080/dashboard/legacy/secure/index.html' );
        // headers.append( ' User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36');
        // headers.append( ' X-Requested-With', 'ShockwaveFlash/32.0.0.433');
        // headers.append( ' Content-Type', 'application/json');
        // headers.append('Accept', '*/*');
        //return this.http.get('http://eos.stg2app01.mariner.local:8080/Dashboard/secure/dashboardService/events/spaces',{headers});

        return this.http.get(this._spacesURL);
         
  }

  //display event list in calendar
  onDisplayEvents():Observable<any>
  {
        //const headers   = {
        //  'Accept': '*/*',
        //  'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        //  ' Connection': 'keep-alive' ,
        //  ' Access-Control-Allow-Origin': '*', 
        //  ' Cookie': 'JSESSIONIDSSO=2toVTHZ45jgyRd-dI46zcoDvNVM7HejIwXA--Z9T; JSESSIONID=NlcB4-vjiFp_jaFtspjnWcGmlJeCgODWRvXVogTc.stg2app01 ',
        //   //' Host': 'eos.stg2app01.mariner.local:8080' ,
        //  ' Referer': 'http://eos.stg2app01.mariner.local:8080/dashboard/legacy/secure/index.html' ,
        //  ' User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36' ,
        //  ' X-Requested-With': 'ShockwaveFlash/32.0.0.433' ,
        //  ' Content-Type': 'application/json'
        //  }

        //  const requestOptions = {                                                                                                                                                                                 
        //   headers: new Headers(headerDict), 
        // };



        // let headers = new Headers();
        // headers.append('Accept', '*/*');
        // headers.append('Accept-Language', 'en-GB,en-US;q=0.9,en;q=0.8');
        // headers.append( ' Connection', 'keep-alive');
        // headers.append(' Access-Control-Allow-Origin', '*');
        // headers.append( ' Cookie', 'JSESSIONIDSSO=2toVTHZ45jgyRd-dI46zcoDvNVM7HejIwXA--Z9T; JSESSIONID=NlcB4-vjiFp_jaFtspjnWcGmlJeCgODWRvXVogTc.stg2app01 ',);
        // headers.append( ' Referer', 'http://eos.stg2app01.mariner.local:8080/dashboard/legacy/secure/index.html' );
        // headers.append( ' User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36');
        // headers.append( ' X-Requested-With', 'ShockwaveFlash/32.0.0.433');
        // headers.append( ' Content-Type', 'application/json');
        // headers.append('Accept', '*/*');
 
        //let params = new HttpParams().set("startDate",01/09/2020).set("endDate", 30/09/2020);  
        //return this.http.get('http://eos.stg2app01.mariner.local:8080/Dashboard/secure/dashboardService/events/spaces',{headers: headers, params: params});
       
    return this.http.get(this._evenListURL);
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

}
