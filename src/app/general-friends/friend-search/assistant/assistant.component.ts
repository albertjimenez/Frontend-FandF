import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {FriendsService, MyFriend} from '../../../home-dashboard/friends/friends.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
  providers: [FriendsService]
})
export class AssistantComponent implements OnInit {

  myControl: FormControl = new FormControl('');
  dbNames = [];
  user: MyFriend = null;
  filteredOptions: Observable<string[]>;
  buttonText = '';
  myIcon = '';

  constructor(private friendService: FriendsService) {
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
  handle_add() {
    alert('Enviando solicitud de amistad');
  }

  // TODO añadir la función que se especifíca en el click
  colorStatus(status: string) {
    switch (status) {
      case 'notAcceptedByMe':
        this.buttonText = 'Aceptar petición';
        this.myIcon = 'done';
        break;
      case 'notAcceptedByTheUser':
        this.buttonText = 'Eliminar petición';
        this.myIcon = 'access_time';
        break;
      case 'friend':
        this.buttonText = 'Eliminar amigo';
        this.myIcon = 'delete';
        break;
      default:
        this.buttonText = 'Añadir amigo';
        this.myIcon = 'person_add';
    }
  }
}
