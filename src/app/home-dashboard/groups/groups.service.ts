import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GroupsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

}

export interface Group {
  name: string;
  description: string;
  closed: boolean;
  users: [string];
}
