import {Component, OnInit} from '@angular/core';
import {MyEvent, parseUnixtimeToDate} from '../home-dashboard/events/events.service';

declare const $: any;

@Component({
  selector: 'app-general-events',
  templateUrl: './general-events.component.html',
  styleUrls: ['./general-events.component.css']
})
export class GeneralEventsComponent implements OnInit {

  eventList = Array<MyEvent>();
  numMatches = this.eventList.length;

  constructor() {
  }

  ngOnInit() {
    const event: MyEvent = {
      name: 'Kebab preuji',
      date: 1525006449,
      description: 'Descripción del evento',
      placeId: 'Casa santi',
      groupId: 'Grupisme'
    };
    this.eventList.push(event, event, event, event);
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
}
