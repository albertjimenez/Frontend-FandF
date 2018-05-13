import {Component, Inject, OnInit} from '@angular/core';
import {Group, GroupsService} from '../home-dashboard/groups/groups.service';
import {parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {isNullOrUndefined} from 'util';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import * as SimpleWebRTC from 'simplewebrtc';

declare let chatGroup: any;

@Component({
  selector: 'app-general-groups',
  templateUrl: './general-groups.component.html',
  styleUrls: ['./general-groups.component.css'],
  providers: [GroupsService],

})
export class GeneralGroupsComponent implements OnInit {

  groupList = Array<Group>();
  numMatches = this.groupList.length;
  private numImages = 10;
  isLoading = true;

  constructor(private groupsService: GroupsService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.groupsService.getMyGroups().subscribe(data => {
      const groups = data.valueOf()['groups'];
      Object.entries(groups).forEach(
        ([key, value]) => {
          const g: Group = {
            name: value.name,
            description: value.description,
            closed: value.closed,
            users: value.users,
            dateOfCreation: value.dateOfCreation,
            createdBy: value.createdBy,
            image: value.image,
            updateDate: value.updateDate,
            _id: value._id,
            headerImg: `${this.randomBgHeader()}.jpg`
          };
          this.groupList.push(g);
        }
      );
      this.isLoading = false;

      // const group: Group = {
      //   name: 'Tetío y neuronía',
      //   description: 'Sólo chorradas y poco más',
      //   closed: true,
      //   users: ['Santi', 'El adris', 'Vervhel'],
      //   dateOfCreation: 1525252545,
      //   createdBy: 'beruto',
      //   image: 'https://cdn.memegenerator.es/imagenes/memes/full/26/55/26550209.jpg',
      //   updateDate: 1525252988,
      //   _id: 'Tiusa',
      //   headerImg: 'https://cdn.memegenerator.es/imagenes/memes/full/26/55/26550209.jpg'
      // };
      // this.groupList.push(group, group);
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  filterElems(filter: string) {
    this.numMatches = 0;
    let ul, li, i, card, title;
    ul = document.getElementById('myUL');
    li = ul.getElementsByClassName('name');
    title = ul.getElementsByClassName('text-center');
    card = ul.getElementsByClassName('card');
    for (i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1 ||
        title[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
        card[i].style.display = '';
        this.numMatches++;
      } else {
        card[i].style.display = 'none';
      }
    }
  }

  rotateCard(btn) {
    const $card = $(btn).closest('.card-container');
    if ($card.hasClass('hover')) {
      $card.removeClass('hover');
    } else {
      $card.addClass('hover');
    }
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }

  randomBgHeader(): number {
    return Math.floor(Math.random() * (this.numImages));
  }

  parseUnixTime(time: string, shortDate?: boolean) {
    return parseUnixtimeToDate(time, shortDate);
  }

  openDialog(_id: string) {
    this.dialog.open(DialogCallComponent, {
      width: '400px',
      height: '640px',
      data: {_id: _id}
    });
  }
}

@Component({
  selector: 'app-dialog-call-component',
  templateUrl: 'dialog-call.html',
})
export class DialogCallComponent {

  webrtc: any;

  constructor(public dialogRef: MatDialogRef<DialogCallComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true
    });
    this.webrtc.on('readyToCall', () => {
      this.webrtc.joinRoom(data._id);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log('Closed');
    this.webrtc.disconnect();
    this.webrtc.stopLocalVideo();
  }

  printData() {
    console.log(this.data);
  }

}
