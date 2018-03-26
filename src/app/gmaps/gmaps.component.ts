import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ComponentRestrictions} from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';


@Component({
  selector: 'app-gmaps',
  template: `<input ngx-google-places-autocomplete [options]="{
    types: ['establishment'],
    componentRestrictions: { country: 'ES'}
    }" #places="ngx-places" (onAddressChange)="onChange($event)" />`,
})
export class GmapsComponent implements OnInit {


  @ViewChild('place') place: GooglePlaceDirective;

  options = {
    types: ['establishment'],
    componentRestrictions: { country: 'ES'}
  };
  constructor() { }

  ngOnInit() {
  }

  public onChange(address: Address) {

  }

}
