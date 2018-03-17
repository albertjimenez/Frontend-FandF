import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {login_endpoint} from '../API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  postLoginCredentials(username: string, password: string): Observable<Object> {
    const credentials = {
      'username': username,
      'password': password,
    };
    return this.http.post(login_endpoint, credentials);
  }

}
