import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  rightscroll() {
    document.getElementById('groups_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('groups_cards').scrollLeft -= 303;
  }
}
