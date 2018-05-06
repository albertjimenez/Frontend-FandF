import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {groups_endpoint} from '../../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupsService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  getMyGroups(): Observable<Object> {
    return this.httpClient.get(groups_endpoint);
  }

  getHomeGroups(): Observable<Object> {
    const params = new HttpParams().set('last', '5');
    return this.httpClient.get(groups_endpoint, {params: params});
  }

}

export interface Group {
  name: string;
  description: string;
  closed: boolean;
  users: [string];
  dateOfCreation?: number;
  createdBy?: string;
  image: string;
  updateDate?: number;
  _id?: string;
  headerImg?: string;
}
