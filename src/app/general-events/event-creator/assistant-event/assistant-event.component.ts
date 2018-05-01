import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-assistant-event',
  templateUrl: './assistant-event.component.html',
  styleUrls: ['./assistant-event.component.css']
})
export class AssistantEventComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2099, 1, 1);
  selectedDate: Date;
  informationFormGroup: FormGroup;
  placeIdFormGroup: FormGroup;
  invitedsFromGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.informationFormGroup = this._formBuilder.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: [''],
      date: ['', Validators.required],
      hour: ['', Validators.required],
    });
    this.placeIdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  setMyDate(value) {
    this.selectedDate = value.value;
  }

  check() {
    // console.log(this.informationFormGroup.controls.eventName.value, this.informationFormGroup.controls,
    // console.log(this.informationFormGroup.controls.eventName.value);
    // console.log(this.informationFormGroup.controls.description.value);
    // console.log(this.informationFormGroup.controls.photoUrl.value);
    // const numericDate = parseDateAndTime(this.selectedDate, this.informationFormGroup.controls.hour.value);
    // console.log(numericDate);
    // console.log(this.informationFormGroup.invalid);

  }

}

export function parseDateAndTime(date: Date, time: string): number {
  const numberDate = date.getTime() / 1000;
  const splittedTime = time.split(':');
  const h = +splittedTime[0];
  const m = +splittedTime[1];
  return numberDate + (h * 3600) + (m * 60);
}
