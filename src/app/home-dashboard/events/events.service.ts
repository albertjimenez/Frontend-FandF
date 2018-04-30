import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

}

export interface MyEvent {
  name: string;
  date: number;
  description: string;
  placeId: string;
  groupId: string;
}

export function parseUnixtimeToDate(time: string) {
  const locale = 'es';
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const myTime = +time;
  const date = new Date(myTime * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  return date.toLocaleDateString(locale, options) + ' ' + hours + ':' + minutes.substr(-2) + ':' +
    seconds.substr(-2);
}
