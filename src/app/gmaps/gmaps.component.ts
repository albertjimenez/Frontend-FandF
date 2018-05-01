import {Component, OnInit} from '@angular/core';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {Router} from '@angular/router';
import {CredentialsService} from '../credentials.service';


@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css'],
  providers: [CredentialsService]
})


export class GmapsComponent implements OnInit {
  tempAddress = null;
  hours = [];
  hour = '';
  rating;
  weekdayText = null;
  state = '';
  stars = [];
  period_one = [['', '']];
  period_two = [['', '']];
  only_one = false;
  is_two_empty = true;
  index = 0;
  is_open = null;
  empty_periods = true;
  phone = null;
  photoArray = [];

  week = [
    {value: '1', viewValue: 'Lunes'},
    {value: '2', viewValue: 'Martes'},
    {value: '3', viewValue: 'Miercoles'},
    {value: '4', viewValue: 'Jueves'},
    {value: '5', viewValue: 'Viernes'},
    {value: '6', viewValue: 'Sabado'},
    {value: '0', viewValue: 'Domingo'}
  ];

  constructor(private credentialsService: CredentialsService, private router: Router) {
  }

  ngOnInit() {
    if (!this.credentialsService.sessionExists()) {
      this.router.navigateByUrl('/login');
      return;
    }
  }

  onChange(address: Address) {
    console.log(address);
    this.tempAddress = address;
    this.hours = [];
    this.period_one = [];
    this.period_two = [];
    this.stars = [];
    try {
      this.phone = address.formatted_phone_number;
      this.is_open = address.opening_hours.open_now;
      this.weekdayText = address.opening_hours.weekday_text;
    } catch (e) {

    }
    if (this.phone == null) {
      this.phone = 'No disponible';
    }
    if (this.is_open !== null) {
      this.state = this.is_open ? 'Abierto' : 'Cerrado';
    } else {
      this.state = 'No disponible';
    }
    if (this.weekdayText !== null) {
      this.weekdayText.map((data, index) => this.hours.push([this.week[index].viewValue, data.split(': ')[1]]));
      this.hour = this.hours[0][1];
      for (let i = 0; i < address.photos.length; i++) {
        console.log('Data phtos ', address.photos[i]);
        const ph = address.photos[i] as any; // Si lo dejas en Photo no reconoce el método
        console.log(ph.getUrl({maxWidth: 500, maxHeight: 500}));
      }

      this.hours.filter(data => data[1] === this.hour).map(data => this.period_one.push(data));

      if (this.index !== this.hours.length) {

        for (this.index; this.index < this.hours.length; this.index++) {
          if (this.hours[this.index][1] === 'Closed') {
            this.period_two.push([this.hours[this.index][0], 'Cerrado']);
          } else if (this.hours[this.index][1] === 'Open 24 hours') {
            this.period_two.push([this.hours[this.index][0], 'Abierto 24 horas']);
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
