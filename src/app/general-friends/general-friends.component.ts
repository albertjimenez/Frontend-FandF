import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-friends',
  templateUrl: './general-friends.component.html',
  styleUrls: ['./general-friends.component.css']
})
export class GeneralFriendsComponent implements OnInit {

  friendsList = [];
  numMatches = 0;
  constructor() { }

  ngOnInit() {
    const friend = {
      name: 'Raúl Peris',
      image: '../../../assets/peris.jpg',
      lastConexion: 'Amigos desde el 29/10/2017'
    };
    this.friendsList.push(friend, friend, friend, friend);
  }


}
