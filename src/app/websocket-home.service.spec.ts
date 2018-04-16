import {inject, TestBed} from '@angular/core/testing';

import {WebsocketHomeService} from './websocket-home.service';

describe('WebsocketHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketHomeService]
    });
  });

  it('should be created', inject([WebsocketHomeService], (service: WebsocketHomeService) => {
    expect(service).toBeTruthy();
  }));
});
