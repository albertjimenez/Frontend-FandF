import {Component, OnInit} from '@angular/core';
import {EventsService, MyEvent} from './events.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventsService]
})
export class EventsComponent implements OnInit {

  isLoading = true;
  eventList = Array<MyEvent>();

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

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.getMyLastEvents().subscribe(data => this.getMyEvents(data), error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  rightscroll() {
    document.getElementById('events_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('events_cards').scrollLeft -= 303;
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }
}
