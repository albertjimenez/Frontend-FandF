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
    this.friendsList.push(friend, friend2, friend3, friend4);
  }

  filterElems(filter: string) {
    this.numMatches = 0;
    let ul, li, i, card;
    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('mat-card-title');
    card = ul.getElementsByTagName('mat-card');
    for (i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
        card[i].style.display = '';
        this.numMatches++;
      } else {
        card[i].style.display = 'none';
      }
    }
  }


}
