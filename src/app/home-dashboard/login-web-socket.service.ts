import {Injectable} from '@angular/core';
import {WS_LOGIN} from '../API_Strings';

@Injectable()
export class LoginWebSocketService {

  webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket(WS_LOGIN);
  }

  broadcastMyLogin(username, token) {
    const credentials = {
      username: username,
      password: '',
      token: token
    };
    this.webSocket.send(JSON.stringify(credentials));
  }

}
