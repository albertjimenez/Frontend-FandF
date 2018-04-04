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
  selectedValue: string;

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
        console.log(address.opening_hours);
        console.log(address.opening_hours.periods.map(day => day.open.time + '<:>'  + day.close.time));
        console.log(address.opening_hours.periods.map(day => day.open.time + '<:>'  + day.close.time)[parseInt(this.selectedValue, 10)]);

  }

}
