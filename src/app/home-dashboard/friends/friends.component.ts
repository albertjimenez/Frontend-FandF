import {Component, OnInit} from '@angular/core';
import {FriendsService} from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [FriendsService]
})
export class FriendsComponent implements OnInit {

  isLoading = true;
  friendsList = [];
  retrieveFriends = (data) => {
    const friends = data.valueOf()['friends'];
    this.friendsList = [];
    Object.entries(friends).forEach(
      ([key, value]) => {
        const g: Object = {
          name: value.name,
          surnames: value.surnames,
          username: value.username,
          lastConnection: value.lastConnection,
          sinceHuman: value.sinceHuman
        };
        this.friendsList.push(g);
      }
    );
    this.isLoading = false;
  }
  private ourPics = ['berbel', 'kaiser', 'beruto', 'toquis'];

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit() {
    this.friendsService.getMyHomeFriends().subscribe(data => this.retrieveFriends(data),
      error2 => console.log('error', error2));
  }

  rightscroll() {
    document.getElementById('friends_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('friends_cards').scrollLeft -= 303;
  }

  isUs(username: string) {
    return this.ourPics.filter(name => username === name).length === 1;
  }
}
