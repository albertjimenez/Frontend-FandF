import {Component} from '@angular/core';
import {CredentialsService} from './credentials.service';
import {WebsocketHomeService} from './websocket-home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CredentialsService, WebsocketHomeService]
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService, private wsservice: WebsocketHomeService) {
  }

  sessionExists() {
    return this.credentialsService.sessionExists();
  }

  updateUsername() {
    return this.credentialsService.getUsername().toString();
  }

}
