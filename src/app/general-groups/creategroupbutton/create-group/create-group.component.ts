import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Group} from '../../../home-dashboard/groups/groups.service';

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
    const MIN_CHAR = 1;
    const MAX_DESCRIPTION_CHAR = 140;
    const MAX_NAME_CHAR = 35;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    this.closedGroup = true;
    this.is_image_upload = false;
    this.createFrom = new FormGroup({
      groupname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(MIN_CHAR),
        Validators.maxLength(MAX_NAME_CHAR)
      ])),
      imageBeforeUpload: new FormControl(),
      members: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(MAX_DESCRIPTION_CHAR))
    });

  }

  create_group() {
    this.groupName = this.createFrom.value.groupname;
    this.description = this.createFrom.value.description;
    this.dateOfCreation = new Date();
    const newGroup: Group = {
      name: this.groupName,
      description: this.description,
      closed: this.closedGroup,
      users: this.createFrom.value.members.split('\n')
    };
    console.log(newGroup);
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
    if (this.createFrom.value.members === '') {
      this.createFrom.patchValue({
        members: this.myControl.value
      });
    } else if(this.createFrom.value.members.indexOf(this.myControl.value) === -1) {
      this.createFrom.patchValue({
        members: this.createFrom.value.members + '\n' + this.myControl.value
      });
    }
    this.myControl.setValue('');
  }

  handle_upload() {
    document.getElementById('upload').click();
  }

  before_upload_image() {
    this.is_image_upload = true;
    const input: any = document.getElementById('upload');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = this.fileOnLoad;
    reader.readAsDataURL(file);

  }
  fileOnLoad(e) {
    const result = e.target.result;
    document.getElementById('group_img').setAttribute('src', result);
  }

}
