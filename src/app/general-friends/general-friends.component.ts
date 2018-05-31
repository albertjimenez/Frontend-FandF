import {Component, Inject, OnInit} from '@angular/core';
import {FriendRequest, FriendsService, MyFriend} from '../home-dashboard/friends/friends.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-general-friends',
  templateUrl: './general-friends.component.html',
  styleUrls: ['./general-friends.component.css'],
  providers: [FriendsService, ToastrService]
})
export class GeneralFriendsComponent implements OnInit {

  friendsList: Array<MyFriend> = [];
  numMatches = 0;
  isLoading = true;
  myPendingRequest: Array<FriendRequest> = [];
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

  constructor(private friendsService: FriendsService, private toastrService: ToastrService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.friendsService.getMyFriends().subscribe(
      data => this.getMyFriends(data), error => console.log('Error', error)
    );
    this.getMyRequests();
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

  getMyRequests() {
    this.friendsService.getMyRequestsFriends().subscribe(
      data => {
        const sentToMe = data.valueOf()['sentToMe'];
        this.myPendingRequest = [];
        Object.entries(sentToMe).forEach(
          ([key, value]) => {
            const f: FriendRequest = {
              from: value.from,
              dateHuman: value.dateHuman,
            };
            this.myPendingRequest.push(f);
          }
        );
      }
    );
  }

  deleteFriend(username: string) {
    this.friendsService.deleteFriend(username).subscribe(data => {
      this.toastrService.info('Eliminado amigo ' + username);
      this.friendsService.getMyFriends().subscribe(dataFriend => this.getMyFriends(dataFriend));
    });
  }

  openDialog() {
    const d = this.dialog.open(DialogFriendRequestsComponent, {
      width: '800px',
      height: '650px',
      data: {requests: this.myPendingRequest},
    });
    d.afterClosed().subscribe(infoDialog => this.getMyRequests());
  }
}

@Component({
  selector: 'app-dialog-friend-requests.component',
  templateUrl: 'dialog-friend-requests.html',
  styleUrls: ['./dialog-friend-requests.css'],
  providers: [FriendsService, ToastrService]
})
export class DialogFriendRequestsComponent {

  myRequests = this.data.requests;
  removeUsername = (username) => {
    console.log('Antes ', this.myRequests);
    this.myRequests = this.myRequests.filter(u => u.from !== username);
    console.log('Después ', this.myRequests);
  }

  constructor(public dialogRef: MatDialogRef<DialogFriendRequestsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private friendService: FriendsService,
              private toastrService: ToastrService) {
  }

  acceptRequest(username: string) {
    this.friendService.acceptRequest(username).subscribe(
      data => {
        this.toastrService.success('Usuario ' + username + ' añadido');
        this.removeUsername(username);
      }
    );
  }

  rejectRequest(username: string) {
    this.friendService.rejectRequest(username).subscribe(
      data => {
        this.toastrService.success('Usuario ' + username + ' rechazado');
        this.removeUsername(username);
      }
    );
  }

}
