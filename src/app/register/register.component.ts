import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatInput} from '@angular/material';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {RegisterClass, RegisterService} from './register.service';
import {HeaderService} from '../header.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService, HeaderService]
})
export class RegisterComponent implements OnInit {


  registerFormControl: FormGroup;
  anyErrors = false;

  constructor(private registerService: RegisterService) {
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

  submitRegisterForm(swal: SwalComponent) {
    const name = this.registerFormControl.value.name;
    const surname = this.registerFormControl.value.surname;
    const email = this.registerFormControl.value.email;
    const username = this.registerFormControl.value.username;
    const password = this.registerFormControl.value.password;
    const rePassword = this.registerFormControl.value.rePassword;
    const registerClass: RegisterClass = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password
    };
    if (password === rePassword) {
      console.log('Oquei');
      const logRequest = (data) => {
        console.log(data);
      };
      if (this.registerFormControl.valid) {
        this.registerService.postRegisterData(registerClass).subscribe(
          data => logRequest(data),
          error => logRequest(error)
        );
      }
    } else {
      swal.show();
    }
    console.log(name, surname, email, username, password, rePassword);
  }
}
