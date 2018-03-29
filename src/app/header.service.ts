import {Injectable} from '@angular/core';
import {RegisterClass} from './register/register.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HeaderService {

  constructor() {
  }

  buildHeaderForRegister(registerData: RegisterClass): Object {
    const httpHeaders = new HttpHeaders({
      'name': registerData.name,
      'surname': registerData.surnames,
      'email': registerData.email,
      'username': registerData.username,
      'password': registerData.password,
    });
    return {headers: httpHeaders};
  }
}
