import {Component, OnInit} from '@angular/core';
import {Group, GroupsService} from './groups.service';
import {parseUnixtimeToDate} from '../events/events.service';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupsService]
})
export class GroupsComponent implements OnInit {

  myGroups: Group[] = [];
  isLoading = true;
  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.groupsService.getHomeGroups().subscribe(
      data => {
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
          });
        this.isLoading = false;
      },
      error => {
        console.log('errror ', error);
        this.isLoading = false;
      }
    );
  }
  rightscroll() {
    document.getElementById('groups_cards').scrollLeft += 303;
  }

  leftscroll() {
    document.getElementById('groups_cards').scrollLeft -= 303;
  }

  parseUnixTimeToStr(time: string) {
    return parseUnixtimeToDate(time);
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }
}
