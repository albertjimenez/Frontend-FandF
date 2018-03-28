import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {


  number;
  name;
  address;
  phone;
  comment;
  author;
  openingHours;
  weekdayText;
  periods;

  constructor() { }

  ngOnInit() {

  }
  onChange(address: Address) {
    this.number = address.reviews.length;
    this.name = address.name;
    this.address = address.formatted_address;
    this.phone = address.formatted_phone_number;
    this.author = address.reviews[this.number - 1].author_name;
    this.comment = address.reviews[this.number - 1].text;
    this.openingHours = address.opening_hours;
    this.weekdayText = address.opening_hours.weekday_text;
    this.periods = address.opening_hours.periods;
    alert(this.openingHours);
    alert(this.weekdayText);
    alert(this.periods);
  }

}
