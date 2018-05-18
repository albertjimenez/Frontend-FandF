import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventsService, MyEvent, parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined, isUndefined} from 'util';
import {CredentialsService} from '../credentials.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group, GroupsService} from '../home-dashboard/groups/groups.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {parseDateAndTime} from './event-creator/assistant-event/assistant-event.component';
import {Router} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-general-events',
  templateUrl: './general-events.component.html',
  styleUrls: ['./general-events.component.css'],
  providers: [EventsService, CredentialsService, ToastrService]
})
export class GeneralEventsComponent implements OnInit, OnDestroy {

  eventList = Array<MyEvent>();
  numMatches = this.eventList.length;
  subscriptionList: Array<Subscription> = Array<Subscription>();
  isLoading = true;
  eventIdRemove = null;
  @ViewChild('removeEvent') removeEvent: SwalComponent;

  // Function getMyEvents
  getMyEvents = (events) => {
    const myEvents = events.valueOf()['events'];
    this.eventList = [];
    Object.entries(myEvents).forEach(
      ([key, value]) => {
        const e: MyEvent = {
          name: value.name,
          description: value.description,
          date: value.dateHuman,
          groupId: value.groupId,
          placeId: value.placeId,
          createdBy: value.createdBy,
          image: value.image,
          _id: value._id,
        };
        this.eventList.push(e);
      }
    );
    this.isLoading = false;
  }

  constructor(private eventsService: EventsService, private toasterService: ToastrService,
              private credentialService: CredentialsService, public dialog: MatDialog) {
  }

  ngOnInit() {
    // const event: MyEvent = {
    //   name: 'Kebab preuji',
    //   date: 1525006449,
    //   description: 'Descripción del evento',
    //   placeId: 'Casa santi',
    //   groupId: 'Grupisme',
    //   image: ''
    // };
    // this.eventList.push(event, event, event, event);
    const subscription = this.eventsService.getMyEvents().subscribe(events => this.getMyEvents(events), error => {
      console.log('Error', error);
      this.isLoading = false;
    });
    this.subscriptionList.push(subscription);
  }

  parseUnixTime(time: string) {
    return parseUnixtimeToDate(time);
  }

  filterElems(filter: string) {
    this.numMatches = 0;
    let ul, li, i, card, title, content;
    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('mat-card-subtitle');
    title = ul.getElementsByTagName('mat-card-title');
    content = ul.getElementsByTagName('mat-card-content');
    card = ul.getElementsByTagName('mat-card');
    for (i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1 ||
        title[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1 ||
        content[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {

        card[i].style.display = '';
        this.numMatches++;
      } else {
        card[i].style.display = 'none';
      }
    }
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }

  ngOnDestroy(): void {
    this.subscriptionList.map(sub => sub.unsubscribe());
    this.subscriptionList = [];
  }

  isMyEvent(createdBy: string): boolean {
    return createdBy.toLowerCase() === this.credentialService.getUsername().toLowerCase();
  }

  removeMyEvent() {
    if (!isNullOrUndefined(this.eventIdRemove)) {
      this.eventsService.removeMyEvent(this.eventIdRemove).subscribe(
        data => {
          this.toasterService.success('Evento borrado con éxito');
          this.eventsService.getMyEvents().subscribe(events => this.getMyEvents(events), error => {
            console.log('Error', error);
            this.isLoading = false;
          });
        },
        error => this.toasterService.error('No se pudo borrar el evento, pruebe más tarde')
      );
    }
  }

  private storeEventIdForRemoving(_id: string) {
    this.eventIdRemove = _id;
    this.removeEvent.show();
  }

  openDialog(event: MyEvent) {
    const d = this.dialog.open(DialogEditEventComponent, {
      width: '750px',
      height: '650px',
      data: {eventData: event},
    });
    d.afterClosed().subscribe((value) => {
      if (value) {
        this.eventsService.getMyEvents().subscribe(events => this.getMyEvents(events), error => {
          console.log('Error', error);
          this.isLoading = false;
        });
      }
    });
  }
}

@Component({
  selector: 'app-dialog-edit-event.component',
  templateUrl: 'dialog-edit-event.html',
  styleUrls: ['./dialog-edit-event.component.css'],
  providers: [GroupsService, EventsService]
})
export class DialogEditEventComponent {

  informationFormGroup: FormGroup;
  minDate = new Date();
  maxDate = new Date(2099, 1, 1);
  selectedDate: Date;
  placeIdFormGroup: FormGroup;
  invitedsFormGroup: FormGroup;
  placeId = '';
  groupId = '';
  myGroups: Group[] = [];
  autocompleteGroups: Group[] = [];
  addressName = '';
  isLoading = true;
  oldEvent: MyEvent = null;
  @ViewChild('eventOk') eventOk: SwalComponent;
  @ViewChild('eventError') eventError: SwalComponent;

  constructor(public dialogRef: MatDialogRef<DialogEditEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
              private groupService: GroupsService, private eventService: EventsService,
              private router: Router) {

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
    this.getMyGroups();
    this.oldEvent = this.data.eventData;
    // Fulfill the form with the previous data
    this.informationFormGroup.controls.eventName.patchValue(this.oldEvent.name);
    this.informationFormGroup.controls.description.patchValue(this.oldEvent.description);
    this.informationFormGroup.controls.photoUrl.patchValue(this.oldEvent.image);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setMyDate(value) {
    this.selectedDate = value.value;
  }

  onChange(address: Address) {
    this.addressName = address.name;
    this.placeId = address.place_id;
  }

  getMyGroups() {
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

  updateEvent() {
    const photo = isUndefined(this.informationFormGroup.controls.photoUrl.value) ?
      'https://foodandfriendsapp.firebaseapp.com/assets/logo/fandflogo.png' :
      this.informationFormGroup.controls.photoUrl.value;
    const myEvent: MyEvent = {
      name: this.informationFormGroup.controls.eventName.value,
      date: parseDateAndTime(this.selectedDate, this.informationFormGroup.controls.hour.value),
      description: this.informationFormGroup.controls.description.value,
      placeId: this.placeId,
      groupId: this.groupId,
      image: photo
    };
    this.eventService.updateEvent(this.oldEvent._id, myEvent).subscribe(data => this.eventOk.show(),
      error => {
        console.log('Error', error);
        this.eventError.show();
      });
  }

  isValid(): boolean {
    return this.informationFormGroup.invalid && this.placeIdFormGroup.invalid
      && this.groupId === '';
  }

  redirectIfSuccess() {
    this.dialogRef.close('true');
  }

  checkPhoto(): string {
    return isUndefined(this.informationFormGroup.controls.photoUrl.value) ?
      'https://foodandfriendsapp.firebaseapp.com/assets/logo/fandflogo.png' :
      this.informationFormGroup.controls.photoUrl.value;
  }

}
