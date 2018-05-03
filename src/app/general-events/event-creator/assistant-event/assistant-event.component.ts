import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {Group, GroupsService} from '../../../home-dashboard/groups/groups.service';
import {EventsService, MyEvent, parseUnixtimeToDate} from '../../../home-dashboard/events/events.service';
import {isUndefined} from 'util';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assistant-event',
  templateUrl: './assistant-event.component.html',
  styleUrls: ['./assistant-event.component.css'],
  providers: [GroupsService, EventsService]
})
export class AssistantEventComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2099, 1, 1);
  selectedDate: Date;
  informationFormGroup: FormGroup;
  placeIdFormGroup: FormGroup;
  invitedsFormGroup: FormGroup;
  placeId = '';
  groupId = '';
  myGroups: Group[] = [];
  autocompleteGroups: Group[] = [];
  isLoading = true;
  addressName = '';

  @ViewChild('eventOk') eventOk: SwalComponent;
  @ViewChild('eventError') eventError: SwalComponent;

  constructor(private _formBuilder: FormBuilder, private groupService: GroupsService, private eventsService: EventsService,
              private router: Router) {
    this.groupService.getMyGroups().subscribe(data => {
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
            _id: value._id
          };
          this.myGroups.push(g);
        }
      );
    }, error => {
      console.log('Error', error);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.autocompleteGroups = this.myGroups;
    });
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
  }

  setMyDate(value) {
    this.selectedDate = value.value;
  }

  onChange(address: Address) {
    this.addressName = address.name;
    this.placeId = address.place_id;
  }

  filterGroups(inputText) {
    this.autocompleteGroups = this.myGroups.filter(g => g.name.toLowerCase().indexOf(inputText.toLowerCase()) > -1);
  }

  onClickGroup(id, name) {
    this.groupId = id;
    this.invitedsFormGroup.controls.groupName.patchValue(name);
  }

  parseDateToStr(): string {
    if (!isUndefined(this.selectedDate) && !isUndefined(this.informationFormGroup.controls.hour.value)) {
      return parseUnixtimeToDate(parseDateAndTime(this.selectedDate, this.informationFormGroup.controls.hour.value).toString());
    }
    return '';
  }

  postData() {
    const photo = isUndefined(this.informationFormGroup.controls.photoUrl.value) ? '' : this.informationFormGroup.controls.photoUrl.value;
    const myEvent: MyEvent = {
      name: this.informationFormGroup.controls.eventName.value,
      date: parseDateAndTime(this.selectedDate, this.informationFormGroup.controls.hour.value),
      description: this.informationFormGroup.controls.description.value,
      placeId: this.placeId,
      groupId: this.groupId,
      image: photo
    };
    this.eventsService.postNewEvent(myEvent).subscribe(data => this.eventOk.show(), error2 => this.eventError.show());
  }

  redirectIfSuccess() {
    this.router.navigateByUrl('/my-events');
  }
}

export function parseDateAndTime(date: Date, time: string): number {
  const numberDate = date.getTime() / 1000;
  const splittedTime = time.split(':');
  const h = +splittedTime[0];
  const m = +splittedTime[1];
  return numberDate + (h * 3600) + (m * 60);
}
