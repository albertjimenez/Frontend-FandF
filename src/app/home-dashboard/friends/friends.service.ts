import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {friends_enpoint} from '../../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FriendsService {

  constructor(private httpClient: HttpClient) {
  }

  getMyFriends(): Observable<Object> {
    return this.httpClient.get(friends_enpoint);
  }

}

export interface MyFriend {
  username: string;
  since: number;
}
