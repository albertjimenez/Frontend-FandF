import {Component} from '@angular/core';
import {CredentialsService} from './credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CredentialsService]
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService) {
  }

  sessionExists() {
    return this.credentialsService.sessionExists();
  }

}
