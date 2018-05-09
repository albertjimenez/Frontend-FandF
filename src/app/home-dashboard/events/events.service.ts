import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {delete_events_endpoint, events_endpoint, post_events_endpoint} from '../../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  postNewEvent(event: MyEvent): Observable<Object> {
    return this.httpClient.post(post_events_endpoint, event);
  }

  getMyEvents(): Observable<Object> {
    return this.httpClient.get(events_endpoint);
  }

  getMyLastEvents(): Observable<Object> { // For the home-dashboard
    const param = new HttpParams().set('next', '5');
    return this.httpClient.get(events_endpoint, {params: param});
  }

  removeMyEvent(_id: string): Observable<Object> {
    return this.httpClient.delete(delete_events_endpoint + _id);
  }
}

export interface MyEvent {
  name: string;
  date: number;
  description: string;
  placeId: string;
  groupId: string;
  image: string;
  createdBy?: string;
  _id?: string;
}

export function parseUnixtimeToDate(time: string, shortDate?: boolean) {
  const locale = 'es';
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const myTime = +time;
  const date = new Date(myTime * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  if (shortDate) {
    return date.toLocaleDateString(locale, options);
  }
  return date.toLocaleDateString(locale, options) + ' ' + hours + ':' + minutes.substr(-2) + ':' +
    seconds.substr(-2);
}
