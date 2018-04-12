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
  hour = '';
  rating;
  weekdayText = null;
  state = 'No disponible';
  stars = [];
  period_one = [['', '']];
  period_two = [['', '']];
  only_one = false;
  is_two_empty = true;
  index = 0;
  is_open = null;
  empty_periods = true;

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
        this.tempAddress = address;
        this.hours = [];
        this.period_one = [];
        this.period_two = [];
        this.stars = [];
        try {
          this.is_open = address.opening_hours.open_now;
          this.weekdayText = address.opening_hours.weekday_text;
        } catch (e) {

        }
        if (this.is_open !== null) {
          if (this.is_open) {
            this.state = 'Abierto';
          } else {
            this.state = 'Cerrado';
          }
        }
        if (this.weekdayText !== null) {
          for (let  i = 0; i < this.weekdayText.length; i++) {
            this.hours.push([this.week[i].viewValue, this.weekdayText[i].split(': ')[1]]);
          }
          this.hour = this.hours[0][1];

          for (this.index = 0; this.index < this.hours.length; this.index++) {
            if (this.hours[this.index][1] === this.hour) {
              this.period_one.push(this.hours[this.index]);
            } else {
              break;
            }
          }
          if (this.index !== this.hours.length) {
            for (this.index; this.index < this.hours.length; this.index++) {
              if (this.hours[this.index][1] === 'Closed') {
                this.period_two.push([this.hours[this.index][0], 'Cerrado']);
              } else {
                this.period_two.push(this.hours[this.index]);
              }

            }
            this.is_two_empty = false;
            if (this.period_two.length === 1) {
              this.only_one = true;
            }
          } else {
            this.is_two_empty = true;
          }
          this.empty_periods = false;
        } else {
          this.empty_periods = true;
        }
        this.rating = address.rating.toFixed();
        for (let i = 0; i < this.rating; i++) {
          this.stars.push(i);
        }

  }

}
