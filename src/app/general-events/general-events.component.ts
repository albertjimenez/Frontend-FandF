import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService, MyEvent, parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {GmapsIdToAddressService} from './gmaps-id-to-address.service';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';

declare const $: any;

@Component({
  selector: 'app-general-events',
  templateUrl: './general-events.component.html',
  styleUrls: ['./general-events.component.css'],
  providers: [GmapsIdToAddressService, EventsService]
})
export class GeneralEventsComponent implements OnInit, OnDestroy {

  eventList = Array<MyEvent>();
  numMatches = this.eventList.length;
  subscriptionList: Array<Subscription> = Array<Subscription>();
  isLoading = true;

  constructor(private gmapsService: GmapsIdToAddressService, private eventsService: EventsService) {
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
    const subscription = this.eventsService.getMyEvents().subscribe(events => {
      const myEvents = events.valueOf()['events'];
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
    }, error => {
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
}
