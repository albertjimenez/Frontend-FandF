import {Component, OnInit} from '@angular/core';
import {Group} from '../home-dashboard/groups/groups.service';

@Component({
  selector: 'app-general-groups',
  templateUrl: './general-groups.component.html',
  styleUrls: ['./general-groups.component.css']
})
export class GeneralGroupsComponent implements OnInit {

  groupList = Array<Group>();
  numMatches = this.groupList.length;

  constructor() {
  }

  ngOnInit() {
    const group: Group = {
      name: 'Tetío y neuronía',
      description: 'Sólo chorradas',
      closed: true,
      users: ['Santi', 'El adris', 'Vervhel']
    };
    this.groupList.push(group, group, group, group);
  }

  // TODO revisar por qué al poner 'chorr' ya sólo sale un elemento, falla en el content
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
}
