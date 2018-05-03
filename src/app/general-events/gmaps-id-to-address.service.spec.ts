import {inject, TestBed} from '@angular/core/testing';

import {GmapsIdToAddressService} from './gmaps-id-to-address.service';

describe('GmapsIdToAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapsIdToAddressService]
    });
  });

  it('should be created', inject([GmapsIdToAddressService], (service: GmapsIdToAddressService) => {
    expect(service).toBeTruthy();
  }));
});
