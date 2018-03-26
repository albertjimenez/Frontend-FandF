import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {ComponentRestrictions} from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import {Address} from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {

  @ViewChild('place') place: GooglePlaceDirective;

  constructor() { }

  ngOnInit() {
  }

  public onChange(address: Address) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
    console.log(address.reviews);
  }

  public changeConfig() {
    this.place.options.componentRestrictions = new ComponentRestrictions({
      country: 'UA'
    });

    this.place.reset();
  }

  public search() {

  }

}
