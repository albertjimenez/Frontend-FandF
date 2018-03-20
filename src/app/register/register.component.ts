import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatInput} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerFormControl: FormGroup;

  constructor() {
  }

  ngOnInit() {
    const MIN_CHARS = 0;
    this.registerFormControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      email: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS), Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      password: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
    });
  }

  showPassword(anInput: MatInput) {
    if (anInput.type === 'password') {
      anInput.type = 'text';
    } else {
      anInput.type = 'password';
    }
  }
}
