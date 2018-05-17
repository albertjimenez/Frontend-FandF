import {inject, TestBed} from '@angular/core/testing';

import {LoginWebSocketService} from './login-web-socket.service';

describe('LoginWebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginWebSocketService]
    });
  });

  it('should be created', inject([LoginWebSocketService], (service: LoginWebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
