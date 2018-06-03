import {Component, OnInit} from '@angular/core';
import {CredentialsService} from './credentials.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CredentialsService, TranslateService]
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // window.addEventListener('beforeunload', () => {
    //   $.ajax({
    //     type: 'DELETE',
    //     async: false,
    //     url: 'https://foodandfriendsapp.herokuapp.com/api/group/5af9a201a80e3d00048a8054s',
    //     success: data => alert(data)
    //   });
    // });
  }

  constructor(private credentialsService: CredentialsService, private translateService: TranslateService) {
    this.translateService.use('es');
    this.translateService.setDefaultLang('es');
  }

  sessionExists() {
    return this.credentialsService.sessionExists();
  }

  updateUsername() {
    return this.credentialsService.getUsername().toString();
  }

}
