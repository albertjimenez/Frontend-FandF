import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

}
