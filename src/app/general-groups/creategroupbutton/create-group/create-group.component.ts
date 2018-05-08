import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, GroupsService} from '../../../home-dashboard/groups/groups.service';
import {Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {ToastrService} from 'ngx-toastr';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  providers: [GroupsService, ToastrService]
})
export class CreateGroupComponent implements OnInit {

  infoFormGroup: FormGroup;
  friendsFormGroup: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;

  fruits: string[] = [];
  @ViewChild('fruitInput') fruitInput: ElementRef;
  @ViewChild('postNewGroupSwal') postNewGroupSwal: SwalComponent;

  allFruits = [
    'Berbel', 'Tokis', 'Peris'
  ];


  constructor(private _formBuilder: FormBuilder, private groupService: GroupsService, private router: Router,
              private toastrService: ToastrService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit() {
    this.infoFormGroup = this._formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: [''],
    });
    this.friendsFormGroup = this._formBuilder.group({
      friends: ['', Validators.required]
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (this.allFruits.indexOf(value) === 0) {
      this.fruits.push(value.trim());
      this.fruits.filter((elem, index, arr) => arr.indexOf(elem) === index);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allFruits.filter(fruit =>
      fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    if (!isNullOrUndefined(this.fruitInput)) {
      this.fruitInput.nativeElement.value = '';
    }
    this.fruits = this.fruits.filter((elem, index, arr) => arr.indexOf(elem) === index);
  }

  validateImg(img: string) {
    return !isNullOrUndefined(img) && img.length >= 15;
  }

  postNewGroup() {

    const myGroup: Group = {
      name: this.infoFormGroup.controls.groupName.value.toString(),
      description: this.infoFormGroup.controls.description.value.toString(),
      closed: false,
      users: this.fruits,
      image: this.infoFormGroup.controls.photoUrl.value.toString(),
    };
    console.log(myGroup);
  }
}
