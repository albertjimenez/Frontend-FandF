import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CredentialsService} from '../../credentials.service';
import {post_events_endpoint} from '../../API_Strings';

@Injectable()
export class EventsService {

  constructor(private router: Router, private httpClient: HttpClient, private credentialsService: CredentialsService) {
  }

  postNewEvent(event: MyEvent) {
    return this.httpClient.post(post_events_endpoint, event);
  }
}

export interface MyEvent {
  name: string;
  date: number;
  description: string;
  placeId: string;
  groupId: string;
  image: string;
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
