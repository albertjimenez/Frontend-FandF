import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService, MyEvent, parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {GmapsIdToAddressService} from './gmaps-id-to-address.service';
import {Subscription} from 'rxjs/Subscription';

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
  // TODO meter el resultado de cada llamado aquí y luego en el ngOnDestroy haces unsuscribe
  subscriptionList: Array<Subscription> = Array<Subscription>();

  constructor(private gmapsService: GmapsIdToAddressService, private eventsService: EventsService) {
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
  }
}
