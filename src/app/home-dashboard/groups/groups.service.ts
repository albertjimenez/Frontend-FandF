import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {groups_endpoint} from '../../API_Strings';
import {CredentialsService} from '../../credentials.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupsService {

  constructor(private router: Router, private httpClient: HttpClient, private credentialsService: CredentialsService) {
  }

  getMyGroups(): Observable<Object> {
    const myHeaders = new HttpHeaders().set('Authorization', this.credentialsService.getToken().toString());
    console.log(myHeaders.get('Authorization'));
    return this.httpClient.get(groups_endpoint, {headers: myHeaders});
  }

}

export interface Group {
  name: string;
  description: string;
  closed: boolean;
  users: [string];
}
