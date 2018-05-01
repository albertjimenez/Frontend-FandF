import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {CredentialsService} from '../../../credentials.service';
import {GroupsService} from '../../../home-dashboard/groups/groups.service';

@Component({
  selector: 'app-assistant-event',
  templateUrl: './assistant-event.component.html',
  styleUrls: ['./assistant-event.component.css'],
  providers: [CredentialsService, GroupsService]
})
export class AssistantEventComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2099, 1, 1);
  selectedDate: Date;
  informationFormGroup: FormGroup;
  placeIdFormGroup: FormGroup;
  invitedsFormGroup: FormGroup;
  placeId = '';
  myGroups: String[];

  constructor(private _formBuilder: FormBuilder, private groupService: GroupsService) {
  }

  ngOnInit() {
    this.informationFormGroup = this._formBuilder.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: [''],
      date: ['', Validators.required],
      hour: ['', Validators.required],
    });
    this.placeIdFormGroup = this._formBuilder.group({
      placeId: ['', Validators.required]
    });
    this.invitedsFormGroup = this._formBuilder.group({
      groupName: ['', Validators.required]
    });
    this.groupService.getMyGroups().subscribe(data => console.log(data), error => console.log('Error', error));
  }

  setMyDate(value) {
    this.selectedDate = value.value;
  }

  onChange(address: Address) {
    this.placeId = address.place_id;
  }
}

export function parseDateAndTime(date: Date, time: string): number {
  const numberDate = date.getTime() / 1000;
  const splittedTime = time.split(':');
  const h = +splittedTime[0];
  const m = +splittedTime[1];
  return numberDate + (h * 3600) + (m * 60);
}
