import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GmapsIdToAddressService {

  private gApi = 'AIzaSyB2Ie7jn4-of6pCiHlF6mdNHhUpSzWc7Rw';
  private endpoint = 'https://maps.googleapis.com/maps/api/place/details/json';

  constructor(private httpClient: HttpClient) {
  }

  fromPlaceIdToAddress(placeId: string): Observable<Object> {
    const queryParams = new HttpParams().set('placeid', placeId).set('key', this.gApi);
    return this.httpClient.get(this.endpoint, {params: queryParams});
  }

}
