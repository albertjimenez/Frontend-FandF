import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Group, GroupsService} from '../home-dashboard/groups/groups.service';
import {parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {isNullOrUndefined} from 'util';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialog,
  MatDialogRef
} from '@angular/material';
import * as SimpleWebRTC from 'simplewebrtc';
import {CredentialsService} from '../credentials.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FriendsService} from '../home-dashboard/friends/friends.service';
import {map, startWith} from 'rxjs/operators';

declare let chatGroup: any;

@Component({
  selector: 'app-general-groups',
  templateUrl: './general-groups.component.html',
  styleUrls: ['./general-groups.component.css'],
  providers: [GroupsService, CredentialsService, ToastrService],

})
export class GeneralGroupsComponent implements OnInit {

  groupList = Array<Group>();
  numMatches = this.groupList.length;
  private numImages = 10;
  isLoading = true;
  groupIDRemoving = null;
  @ViewChild('removeGroup') removeGroup: SwalComponent;
  retrieveGroups = (data) => {
    const groups = data.valueOf()['groups'];
    this.groupList = [];
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
  }

  constructor(private groupsService: GroupsService, public dialog: MatDialog,
              private credentialsService: CredentialsService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.groupsService.getMyGroups().subscribe(data => {
      this.retrieveGroups(data);

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

  removeSelectedGroup() {
    if (!isNullOrUndefined(this.groupIDRemoving)) {
      this.groupsService.removeGroup(this.groupIDRemoving).subscribe(() =>
        this.toastrService.success('Grupo borrado con éxito'));
      this.groupsService.getMyGroups().subscribe(data => this.retrieveGroups(data));
    }
  }

  showRemoveDialog(_id: string) {
    this.groupIDRemoving = _id;
    this.removeGroup.show();
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

  iAmOwner(owner: string): boolean {
    return this.credentialsService.getUsername().toLowerCase() === owner.toLowerCase();
  }

  openDialog(_id: string, username: string, groupname: string) {
    this.dialog.open(DialogCallComponent, {
      width: '1000px',
      height: '500',
      data: {_id: _id, username: username, groupname: groupname},
      closeOnNavigation: true,
      disableClose: true,
      hasBackdrop: true
    });
  }

  getMyUsername(): string {
    return this.credentialsService.getUsername().toString();
  }

  openEditDialog(group: Group) {
    const d = this.dialog.open(DialogEditGroupComponent, {
      width: '1000px',
      height: '500',
      data: {group: group},
    });
    d.afterClosed().subscribe(value => {
      if (value) {
        this.groupsService.getMyGroups().subscribe(data => this.retrieveGroups(data), error2 => console.log(error2));
      }
    });
  }
}

@Component({
  selector: 'app-dialog-call-component',
  templateUrl: 'dialog-call.html',
  styleUrls: ['./dialog-call.css'],
})
export class DialogCallComponent {

  webrtc: any;

  constructor(public dialogRef: MatDialogRef<DialogCallComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true,
      adjustPeerVolume: true
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

  pauseVideo() {
    this.webrtc.pause();
  }

  resumeVideo() {
    this.webrtc.resume();
  }

}

@Component({
  selector: 'app-dialog-edit-group-component',
  templateUrl: 'dialog-edit-group.html',
  styleUrls: ['./dialog-edit-group.css'],
  providers: [GroupsService, FriendsService, ToastrService]
})
export class DialogEditGroupComponent {

  infoFormGroup: FormGroup;
  friendsFormGroup: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;

  fruits: string[] = [];
  @ViewChild('fruitInput') fruitInput: ElementRef;
  @ViewChild('postNewGroupSwal') postNewGroupSwal: SwalComponent;
  allFruits: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogEditGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
              private groupService: GroupsService, private router: Router,
              private toastrService: ToastrService, private friendsService: FriendsService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()));
    this.infoFormGroup = this._formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: [''],
    });
    this.friendsFormGroup = this._formBuilder.group({
      friends: ['', Validators.required]
    });
    this.friendsService.getMyFriends().subscribe(
      friends => {
        const arrayFriends = friends.valueOf()['friends'];
        this.allFruits = arrayFriends.map(a => a.username);
        this.fruits = [...this.allFruits];
      },
      error2 => console.log(error2)
    );
    this.infoFormGroup.controls.groupName.patchValue(data.group.name);
    this.infoFormGroup.controls.description.patchValue(data.group.description);
    this.infoFormGroup.controls.photoUrl.patchValue(data.group.image);

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (this.allFruits.indexOf(value) === 0) {
      this.fruits.push(value.trim());
      this.fruits.filter((elem, index, arr) => arr.indexOf(elem) === index);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allFruits.filter(fruit =>
      fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    if (!isNullOrUndefined(this.fruitInput)) {
      this.fruitInput.nativeElement.value = '';
    }
    this.fruits = this.fruits.filter((elem, index, arr) => arr.indexOf(elem) === index);
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }

  invalidForm() {
    return this.infoFormGroup.invalid || this.allFruits.length === 0;
  }

  closeDialog(value?: string) {
    this.dialogRef.close(value);
  }

  updateGroup() {
    const myGroup: Group = {
      name: this.infoFormGroup.controls.groupName.value.toString(),
      description: this.infoFormGroup.controls.description.value.toString(),
      closed: true,
      users: this.fruits,
      image: this.infoFormGroup.controls.photoUrl.value.toString(),
    };
    this.groupService.updateGroup(this.data.group._id, myGroup).subscribe(
      () => {
        this.toastrService.success('Grupo actualizado correctamente');
        this.closeDialog('true');
      },
      error => console.log('Error ', error)
    );
  }

  checkPhoto(): string {
    return isNullOrUndefined(this.infoFormGroup.controls.photoUrl.value) ?
      'http://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Group-icon.png' :
      this.infoFormGroup.controls.photoUrl.value;
  }

}
