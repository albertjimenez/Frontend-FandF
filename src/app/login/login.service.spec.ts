import {inject, TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HeaderService} from '../header.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, HeaderService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
