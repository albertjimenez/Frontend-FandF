import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HeaderService} from '../header.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Router} from '@angular/router';
import {CredentialsService} from '../credentials.service';
import {ProfileService} from '../profile.service';
import '../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, HeaderService, CredentialsService]
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginFormControl: FormGroup;
  @ViewChild('loginError') loginError: SwalComponent;
  @ViewChild('loginOk') loginOk: SwalComponent;

  constructor(private loginService: LoginService, private router: Router, private credentialsService: CredentialsService,
              private profileService: ProfileService) {
  }


  ngOnInit() {
    const MIN_CHARS = 1;
    this.loginFormControl = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      password: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  onLoginAccess() {
    const username = this.loginFormControl.value.username;
    const password = this.loginFormControl.value.password;

    this.loginService.postLoginCredentials(username, password).subscribe(data => {
      this.profileService.retrieveMyEmail(username).subscribe(email_response => {
        this.credentialsService.storeMySession(username, data.toString(), password, email_response.toString());
        this.router.navigateByUrl('/sidebar');
        // window.location.reload();
      });
    }, error => this.loginError.show(), () => this.loginOk.show());
  }

  sessionExists() {
    return this.credentialsService.sessionExists();
  }
}
