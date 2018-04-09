import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  rightscroll() {
    document.getElementById('events_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('events_cards').scrollLeft -= 303;
  }
}
