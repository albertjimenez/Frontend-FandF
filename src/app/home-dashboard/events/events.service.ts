import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

}

export interface Event {
  name: string;
  date: number;
  description: string;
  placeId: string;
  groupId: string;
}
