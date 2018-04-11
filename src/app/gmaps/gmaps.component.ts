import { Component, OnInit } from '@angular/core';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})


export class GmapsComponent implements OnInit {
  tempAddress = null;
  hours = [];
  rating;
  state;
  stars = [];

  week = [
    {value: '1', viewValue: 'Lunes'},
    {value: '2', viewValue: 'Martes'},
    {value: '3', viewValue: 'Miercoles'},
    {value: '4', viewValue: 'Jueves'},
    {value: '5', viewValue: 'Viernes'},
    {value: '6', viewValue: 'Sabado'},
    {value: '0', viewValue: 'Domingo'}
  ];
  constructor() { }

  ngOnInit() {

  }
  onChange(address: Address) {
    // this.number = address.reviews.length;
        this.tempAddress = address;
        if (address.opening_hours.open_now) {
          this.state = 'Abierto';
        } else {
          this.state = 'Cerrado';
        }
        console.log(address.opening_hours);
        for (let  i = 0; i < address.opening_hours.weekday_text.length; i++) {
          this.hours.push(address.opening_hours.weekday_text[i].split(': '));
        }
        this.rating = address.rating.toFixed();
        for (let i = 0; i < this.rating; i++) {
          this.stars.push(i);
        }
  }

}
