import {Component} from '@angular/core';
import {CredentialsService} from './credentials.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CredentialsService, TranslateService]
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService, private translateService: TranslateService) {
    this.translateService.use('es');
    this.translateService.setDefaultLang('en');
  }

  sessionExists() {
    return this.credentialsService.sessionExists();
  }

  updateUsername() {
    return this.credentialsService.getUsername().toString();
  }

}
