import {Injectable} from '@angular/core';
import {KEYS} from './KEY_SESSIONS';
import {Router} from '@angular/router';

@Injectable()
export class CredentialsService {

  private localStorage = window.localStorage;

  constructor(private router: Router) {
  }

  storeMySession(username: String, token: String, password: String, email: String) {
    [username, token, password, email].map((data, index) =>
      localStorage.setItem(KEYS[index], data.toString()));
  }

  sessionExists(): Boolean {
    return KEYS.filter(elem => this.localStorage.getItem(elem) === null).length === 0;
  }

  logout(): void {
    KEYS.map(elem => this.localStorage.removeItem(elem));
    this.router.navigateByUrl('/login');
  }

  getUsername(): String {
    return this.sessionExists() ? this.localStorage.getItem(KEYS[0]) : '';
  }

  getToken(): String {
    return this.sessionExists() ? this.localStorage.getItem(KEYS[1]) : '';
  }

  getPassword(): String {
    return this.sessionExists() ? this.localStorage.getItem(KEYS[2]) : '';
  }

  getEmail(): String {
    return this.sessionExists() ? this.localStorage.getItem(KEYS[3]) : '';
  }

}
