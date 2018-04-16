import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  rightscroll() {
    document.getElementById('friends_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('friends_cards').scrollLeft -= 303;
  }

}
