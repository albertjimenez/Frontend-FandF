import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  createFrom: FormGroup;
  groupName = '';

  constructor() { }

  ngOnInit() {
    this.createFrom = new FormGroup({
      groupname: new FormControl(),
      image: new FormControl(),
      members: new FormControl()
    });
  }

  createGroup() {
    alert(this.createFrom.value.groupname);

  }

}
