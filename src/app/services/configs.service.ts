import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'; 

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	api_Url = '/dashboard/external/secure/dashboardService';

	private _popupSelectURL = 'assets/api/locationselectoption.json';
	private _popupModeURL = 'assets/api/modeselectoption.json';

	constructor(private http: HttpClient) {}

	/***********************************************PLANNER PAGE********************************************************** */


	// popup type select option
	onTypeDataService(): Observable < any > {
		return this.http.get(this.api_Url + '/events/types')
	}

	// popup mode select option
	onModeDataService(): Observable < any > {
		return this.http.get(this._popupModeURL)
	}

	//popup location select option
	onLocationService(): Observable < any > {
		return this.http.get(this.api_Url + '/events/default/spaces?id=c1386f4c-b4ec-11e3-9c42-005056a93afd')
	}


	//filter by space select option
	onFilterBySpaces(): Observable < any > {
		return this.http.get(this.api_Url + '/events/spaces');
	}

	//display event list in calendar
	onDisplayEvents(startDates:any, endDates:any): Observable < any > {
		return this.http.get(this.api_Url + '/events?startDate='+startDates +'&endDate='+endDates);
	}
	//CONTROL POINT PAGE

	// control point select option
	onControlListOptions(): Observable < any > {
		let httpParams = new HttpParams({
			fromObject: {
				widgetType: 'setpoints',
			}
		});
		return this.http.get(this.api_Url + '/widgets/getLayouts', {
			params: httpParams
		})
	}

	// control point description list
	onControlDescriptionList(widgetId): Observable < any > {
		return this.http.get(this.api_Url + '/widgets/getLayout?id=' + widgetId)
	}
	//popup add event post
	onAddlistEvent(datas):Observable < any >
	{
		return this.http.post(this.api_Url+'/events/add',datas);
	}
	//popup edit event post
	onEditlistEvent(datas):Observable < any>
	{
		return this.http.post(this.api_Url+'/events/update/OCCURRENCE',datas)
	} 




	//STATUS PAGE 

	//status page initially displaying list
	onStatusService(): Observable < any > {
		return this.http.get(this.api_Url + '/status/get')
	}

	// status setting click list options --> popup
	onStatusManufact(widgetId: any): Observable < any > {
		return this.http.get(this.api_Url + '/status/devicerw?widgetId=' + widgetId);
	}

	// status optimization  --> popup switch toggle
	onUpdateStatus(data: any, status) {

		return this.http.post(this.api_Url + '/widgets/enableControllableStatus?id=' + data.id + '&status=' + status, status);
	}


	//status optimization click list option --> popup
	onStatusOptimization(id: any): Observable < any > {
		return this.http.get(this.api_Url + '/widgets/getLayout?id=' + id)
	}

	// GRAPHIC
	//for graphics page
	onGetGraphicsDetails(): Observable < any > {
		return this.http.get('/dashboard/external/secure/dashboardService/bowl/data')
	}


	getdefaultSpaces(id:any) {
		return this.http.get('/dashboard/external/secure/dashboardService/events/default/spaces?id='+id);
	}

	getDefaultModes(id:any) {
		return this.http.get('/dashboard/external/secure/dashboardService/targets/modes/space/'+id);
	}

}