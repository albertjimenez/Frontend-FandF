import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {groups_endpoint} from '../../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  getMyGroups(): Observable<Object> {
    return this.httpClient.get(groups_endpoint);
  }

}

export interface Group {
  name: string;
  description: string;
  closed: boolean;
  users: [string];
  dateOfCreation: number;
  createdBy: string;
  image: string;
  updateDate: number;
  _id: string;
}
