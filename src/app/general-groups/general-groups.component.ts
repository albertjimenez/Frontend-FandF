import {Component, OnInit} from '@angular/core';
import {Group, GroupsService} from '../home-dashboard/groups/groups.service';
import {parseUnixtimeToDate} from '../home-dashboard/events/events.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-general-groups',
  templateUrl: './general-groups.component.html',
  styleUrls: ['./general-groups.component.css'],
  providers: [GroupsService]
})
export class GeneralGroupsComponent implements OnInit {

  groupList = Array<Group>();
  numMatches = this.groupList.length;
  private numImages = 10;
  isLoading = true;

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.groupsService.getMyGroups().subscribe(data => {
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
            _id: value._id,
            headerImg: `${this.randomBgHeader()}.jpg`
          };
          // this.groupList.push(g);
        }
      );
      const group: Group = {
        name: 'Tetío y neuronía',
        description: 'Sólo chorradas y poco más',
        closed: true,
        users: ['Santi', 'El adris', 'Vervhel'],
        dateOfCreation: 1525252545,
        createdBy: 'beruto',
        image: 'https://cdn.memegenerator.es/imagenes/memes/full/26/55/26550209.jpg',
        updateDate: 1525252988,
        _id: 'Tiusa',
      };
      this.groupList.push(group, group, group, group);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  filterElems(filter: string) {
    this.numMatches = 0;
    let ul, li, i, card, title;
    ul = document.getElementById('myUL');
    li = ul.getElementsByClassName('name');
    title = ul.getElementsByClassName('text-center');
    card = ul.getElementsByClassName('card');
    for (i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1 ||
        title[i].innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
        card[i].style.display = '';
        this.numMatches++;
      } else {
        card[i].style.display = 'none';
      }
    }
  }

  rotateCard(btn) {
    const $card = $(btn).closest('.card-container');
    if ($card.hasClass('hover')) {
      $card.removeClass('hover');
    } else {
      $card.addClass('hover');
    }
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }

  randomBgHeader(): number {
    return Math.floor(Math.random() * (this.numImages));
  }

  parseUnixTime(time: string, shortDate?: boolean) {
    return parseUnixtimeToDate(time, shortDate);
  }
}
