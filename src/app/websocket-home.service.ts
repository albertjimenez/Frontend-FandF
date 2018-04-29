import {Injectable} from '@angular/core';
import {WS_HOME} from './API_Strings';
import {CredentialsService} from './credentials.service';


@Injectable()
export class WebsocketHomeService {

  private websocket: WebSocket;

  constructor(private credentialsService: CredentialsService) {
    this.websocket = new WebSocket(WS_HOME);
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    this.websocket.onerror = this.onError;
    window.onbeforeunload = this.browserClose;
    setTimeout(() => this.websocket.send(this.credentialsService.getUsername() + ' ha iniciado sesión'), 3000);
  }

  onOpen(event) {
    console.log('Estoy abierto');
  }

  onClose(event) {
    console.log('Estoy cerrado');
  }

  onError() {
    console.log('Estoy errado');
  }

  browserClose() {
    this.websocket.close();
  }

}
