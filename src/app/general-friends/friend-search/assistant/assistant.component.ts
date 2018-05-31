import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {FriendsService, MyFriend} from '../../../home-dashboard/friends/friends.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
  providers: [FriendsService, ToastrService]
})
export class AssistantComponent implements OnInit {

  myControl: FormControl = new FormControl('');
  dbNames = [];
  user: MyFriend = null;
  filteredOptions: Observable<string[]>;
  buttonText = '';
  myIcon = '';
  // una función que se encarga de llamar a la que toca
  funAction: Function = null;

  funError = (error) => {
    console.log(error);
    this.toastrServide.error('Error tramitando la petición, pruebe más tarde');
  }
  funAcceptFriend = (username) => {
    console.log('Aceptando ' + username);
    this.friendService.acceptRequest(username).subscribe(
      data => this.toastrServide.success('Usuario ' + username + ' aceptado'),
      error => this.funError(error)
    );
  }
  funRejectFriend = (username) => {
    console.log('Rechazando ' + username);
    this.friendService.rejectRequest(username).subscribe(
      data => this.toastrServide.success('Usuario ' + username + ' rechazado'),
      error => this.funError(error)
    );
  }
  funSendRequestFriendship = (username) => {
    console.log('Enviando petición', username);
    this.friendService.sendFriendRequest(username).subscribe(
      data => this.toastrServide.success('Usuario ' + username + ' ha recibido tu petición de amistad'),
      error => this.funError(error)
    );
  }
  funDeletefriend = (username) => {
    console.log('Eliminando amigo', username);
    this.friendService.deleteFriend(username).subscribe(
      data => this.toastrServide.info('Eliminado amigo ' + username),
      error => this.funError(error)
    );
  }


  constructor(private friendService: FriendsService, private toastrServide: ToastrService) {
  }

  ngOnInit() {

    this.friendService.autocompleteUsernames().subscribe(
      data =>
        this.dbNames = data.valueOf()['usernames']
    );
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
    const filteredUser = this.dbNames.filter(user => user === friendName);
    if (filteredUser.length === 1) {
      this.friendService.detailedUser(friendName).subscribe(
        data => {
          this.user = data.valueOf()['user'];
          this.colorStatus(this.user.status);
        }
      );
    } else {
      this.user = null;
    }
  }
  colorStatus(status: string) {
    switch (status) {
      case 'notAcceptedByMe':
        this.buttonText = 'Aceptar petición';
        this.myIcon = 'done';
        this.funAction = this.funAcceptFriend;
        break;
      case 'notAcceptedByTheUser':
        this.buttonText = 'Eliminar petición';
        this.myIcon = 'access_time';
        this.funAction = this.funRejectFriend;
        break;
      case 'friend':
        this.buttonText = 'Eliminar amigo';
        this.myIcon = 'delete';
        this.funAction = this.funDeletefriend;
        break;
      default:
        this.buttonText = 'Añadir amigo';
        this.myIcon = 'person_add';
        this.funAction = this.funSendRequestFriendship;
    }
  }
}
