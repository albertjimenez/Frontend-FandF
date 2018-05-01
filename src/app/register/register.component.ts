import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatInput} from '@angular/material';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {RegisterClass, RegisterService} from './register.service';
import {HeaderService} from '../header.service';
import {LoginService} from '../login/login.service';
import {CredentialsService} from '../credentials.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService, HeaderService]
})
export class RegisterComponent implements OnInit {


  registerFormControl: FormGroup;
  isRegistering = false;
  @ViewChild('passwordSwal') passwordSwal: SwalComponent;
  @ViewChild('loginOkSwal') loginOkSwal: SwalComponent;
  @ViewChild('duplicatedEmail') duplicatedEmail: SwalComponent;
  @ViewChild('duplicatedUsername') duplicatedUsername: SwalComponent;

  constructor(private registerService: RegisterService, private loginService: LoginService,
              private credentialsService: CredentialsService, private router: Router) {
  }

  ngOnInit() {
    const MIN_CHARS = 1;
    this.registerFormControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      email: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS), Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(MIN_CHARS)]),
    });
  }

  showPassword(anInput: MatInput) {
    anInput.type = anInput.type === 'password' ? 'text' : 'password';
  }

  submitRegisterForm(swal: SwalComponent) {
    const name = this.registerFormControl.value.name;
    const surnames = this.registerFormControl.value.surname;
    const email = this.registerFormControl.value.email;
    const username = this.registerFormControl.value.username;
    const password = this.registerFormControl.value.password;
    const rePassword = this.registerFormControl.value.rePassword;
    const registerClass: RegisterClass = {
      name: name,
      surnames: surnames,
      email: email,
      username: username,
      password: password
    };
    const success = (_) => {
      this.loginService.postLoginCredentials(registerClass.username, registerClass.password).subscribe(token =>
        afterSuccess(token), err => console.log(err));
    };
    // para obtener el token, después de haberse registrado, hacemos una petición al login para
    // tener el token y guardarlo en la sesión

    const afterSuccess = (data) => {
      this.credentialsService.storeMySession(registerClass.username, data.valueOf()['token'], password, email);
      this.loginOkSwal.show();
      this.isRegistering = false;
      this.router.navigateByUrl('/sidebar');
    };
    const showErrors = (error) => {
      console.log(error);
      if (error.status === 409) {// CONFLICT
        if (error.error.message != null && error.error.message.toString().indexOf('username') >= 0) {
          this.duplicatedUsername.show();
        } else {
          this.duplicatedEmail.show();
        }
      }
    };

    if (password === rePassword) {
      if (this.registerFormControl.valid) {
        this.registerService.postRegisterData(registerClass).subscribe(
          data => success(data),
          error => {
            this.isRegistering = false;
            showErrors(error);
          }
        );
      }
    } else {
      swal.show();
    }
  }
}
