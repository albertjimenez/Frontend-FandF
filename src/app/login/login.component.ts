import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HeaderService} from '../header.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, HeaderService]
})
export class LoginComponent implements OnInit {

  loginFormControl: FormGroup;
  @ViewChild('loginError') loginError: SwalComponent;
  @ViewChild('loginOk') loginOk: SwalComponent;

  constructor(private loginService: LoginService) {
  }


  ngOnInit() {
    const MIN_CHARS = 0;
    this.loginFormControl = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      password: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
    });
  }

  onLoginAccess() {
    const username = this.loginFormControl.value.username;
    const password = this.loginFormControl.value.password;

    console.log('Username: ', username, 'Password:', password);
    this.loginService.postLoginCredentials(username, password).subscribe(data => {
      console.log('Successful ', data);
    }, error => this.loginError.show(), () => this.loginOk.show());
  }
}
