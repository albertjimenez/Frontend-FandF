import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {register_endpoint} from '../API_Strings';
import {HeaderService} from '../header.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private httpClient: HttpClient, private headerService: HeaderService) {
  }

  postRegisterData(registerClass: RegisterClass): Observable<Object> {
    const registerEndpoint = register_endpoint;
    const object = {
      name: registerClass.name,
      username: registerClass.username,
      password: registerClass.password,
      surnames: registerClass.surname,
      email: registerClass.email,
    };
    return this.httpClient.post(registerEndpoint, object, this.headerService.buildHeaderForRegister(registerClass));
  }
}

export interface RegisterClass {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}