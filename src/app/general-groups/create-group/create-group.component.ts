import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  myControl: FormControl = new FormControl();

  options = [
    'Peris',
    'Berbel',
    'Santi',
    'Tokeisi',
    'Pereta',
    'Pedriza',
    'Harry'
  ];
  privacy = [
    {value: 'private', viewValue: 'Privado', description: 'Solo el propietario del grupo puede invitar a otros usuarios.', icon: 'lock'},
    {value: 'public', viewValue: 'Público', description: 'Cualquier usuario puede encontrar el grupo y solicitar unirse.', icon: 'language'}
  ];
  createFrom: FormGroup;
  groupName = '';
  image: string;
  is_image_upload: boolean;
  description = '';
  dateOfCreation: Date;
  closedGroup: boolean;
  selectedValue = 'private';
  filteredOptions: Observable<string[]>;


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    this.closedGroup = true;
    this.is_image_upload = false;
    this.createFrom = new FormGroup({
      groupname: new FormControl(),
      imageBeforeUpload: new FormControl(),
      imageAfterUpload: new FormControl(),
      members: new FormControl(),
      description: new FormControl()
    });

  }

  createGroup() {
    this.groupName = this.createFrom.value.groupname;
    this.description = this.createFrom.value.description;
    this.dateOfCreation = new Date();
      }

  change_privacy() {
    if (this.selectedValue === 'private') {
      this.closedGroup = true;
    } else if (this.selectedValue === 'public') {
      this.closedGroup = false;
    }
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  new_friend() {
    if (this.createFrom.value.members === null) {
      this.createFrom.patchValue({
        members: this.myControl.value
      });
    } else {
      this.createFrom.patchValue({
        members: this.createFrom.value.members + '\n' + this.myControl.value
      });
    }

  }

  handle_upload() {
    document.getElementById('upload').click();
  }

  before_upload_image() {
    this.is_image_upload = true;
    alert(this.createFrom.value.imageBeforeUpload);
    this.image = this.createFrom.value.imageBeforeUpload;
  }

  after_upload_image() {
    this.image = this.createFrom.value.imageAfterUpload;
  }

  handle_image() {
    document.getElementById('upload2').click();
  }


}
