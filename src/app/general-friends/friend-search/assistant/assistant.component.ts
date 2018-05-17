import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  myControl: FormControl = new FormControl();

  dbNames = [
    'Santi',
    'Berbel',
    'Peris',
    'Tokeisi'
  ];

  dbUsers = [];
  firstSearched = true;
  user = null;
  filteredOptions: Observable<string[]>;
  constructor() { }

  ngOnInit() {
    const friend = {
      name: 'Peris',
      image: '../../../assets/peris.jpg',
      lastConexion: 'Amigos desde el 29/10/2017'
    };
    const friend2 = {
      name: 'Santi',
      image: '../../../assets/santi.jpg',
      lastConexion: 'Amigos desde el 29/10/2017'
    };
    const friend3 = {
      name: 'Berbel',
      image: '../../../assets/berbel.jpg',
      lastConexion: 'Amigos desde el 29/10/2017'
    };
    const friend4 = {
      name: 'Tokeisi',
      image: '../../../assets/tokeisi.jpg',
      lastConexion: 'Amigos desde el 29/10/2017'
    };
    this.dbUsers.push(friend, friend2, friend3, friend4);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.dbNames.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  search() {
    const friendName = this.myControl.value;
    this.firstSearched = false;
    for (let i = 0; i < this.dbUsers.length; i++) {
      if (this.dbUsers[i].name === friendName) {
        this.user = this.dbUsers[i];
        break;
      }
    }
  }
  change_option() {
    this.firstSearched = true;
  }
}
