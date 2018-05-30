import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  accept_friend_requests_enpoint,
  create_friend_requests_enpoint,
  delete_friend_requests_enpoint,
  detailed_username_endpoint,
  friend_requests_enpoint,
  friends_enpoint,
  usernames_endpoint
} from '../../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FriendsService {

  constructor(private httpClient: HttpClient) {
  }

  private static usernameParam(username: string): HttpParams {
    return new HttpParams().set('username', username);
  }
  getMyFriends(): Observable<Object> {
    return this.httpClient.get(friends_enpoint);
  }

  getMyRequestsFriends(): Observable<Object> {
    return this.httpClient.get(friend_requests_enpoint);
  }

  rejectRequest(username: string): Observable<Object> {
    return this.httpClient.delete(delete_friend_requests_enpoint,
      {params: FriendsService.usernameParam(username)});
  }

  acceptRequest(username: string): Observable<Object> {
    return this.httpClient.post(accept_friend_requests_enpoint,
      {params: FriendsService.usernameParam(username)});
  }

  sendFriendRequest(username: string) {
    return this.httpClient.post(create_friend_requests_enpoint,
      {params: FriendsService.usernameParam(username)});
  }

  autocompleteUsernames(): Observable<Object> {
    return this.httpClient.get(usernames_endpoint);
  }

  detailedUser(username: string): Observable<Object> {
    return this.httpClient.get(detailed_username_endpoint + username);
  }
}

export interface MyFriend {
  username: string;
  since?: number;
  sinceHuman?: string;
  status?: string;
  name?: string;
  surnames?: string;
  image?: string;
}
