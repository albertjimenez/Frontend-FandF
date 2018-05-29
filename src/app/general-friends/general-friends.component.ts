import {Component, OnInit} from '@angular/core';
import {FriendsService, MyFriend} from '../home-dashboard/friends/friends.service';

@Component({
  selector: 'app-general-friends',
  templateUrl: './general-friends.component.html',
  styleUrls: ['./general-friends.component.css'],
  providers: [FriendsService]
})
export class GeneralFriendsComponent implements OnInit {

  friendsList: Array<MyFriend> = [];
  numMatches = 0;
  isLoading = true;
  getMyFriends = (friends) => {
    const myEvents = friends.valueOf()['friends'];
    this.friendsList = [];
    Object.entries(myEvents).forEach(
      ([key, value]) => {
        const e: MyFriend = {
          username: value.username,
          since: value.since,
          sinceHuman: value.sinceHuman,
        };
        this.friendsList.push(e);
      }
    );
    this.isLoading = false;
  }

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit() {
    this.friendsService.getMyFriends().subscribe(
      data => this.getMyFriends(data), error => console.log('Error', error)
    );
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
