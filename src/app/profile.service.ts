import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fetch_email} from './API_Strings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Recupera el correo asociado al nombre de usuario
   * @param {String} username Nombre de usuario
   * @return {String} cadena vacía si no está, o el email
   */
  retrieveMyEmail(username: String): Observable<Object> {
    return this.httpClient.get(fetch_email, {headers: {username: username.toString()}});
  }
}
