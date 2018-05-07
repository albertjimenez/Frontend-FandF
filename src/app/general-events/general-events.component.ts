import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventsService, MyEvent, parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {CredentialsService} from '../credentials.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {ToastrService} from 'ngx-toastr';

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
              private credentialService: CredentialsService) {
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
}
