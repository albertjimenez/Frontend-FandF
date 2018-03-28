import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {

  tempAddress = null;
  hours = null;

  constructor() { }

  ngOnInit() {

  }
  onChange(address: Address) {
    // this.number = address.reviews.length;
        this.tempAddress = address;
        console.log(address.opening_hours);
        const array = this.tempAddress.opening_hours.weekday_text.map( elem => elem.split(':'));
        const weekday = array.map(elem => elem[0]);
        console.log(address.opening_hours.periods.map(day => day.open.time + '<:>'  + day.close.time).filter(elem => elem.startsWith('10')));
  }

}
