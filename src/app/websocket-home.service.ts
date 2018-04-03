import {Injectable} from '@angular/core';
import {WS_HELLO} from './API_Strings';


@Injectable()
export class WebsocketHomeService {

  private websocket = new WebSocket(WS_HELLO);

  constructor() {
    this.websocket.onopen = event => {
      console.log('Estoy abierto');
    };
    this.websocket.onclose = () => {
      console.log('Estoy cerrado');
    };
    this.websocket.onerror = event => {
      console.log('Estoy errado');
    };
  }

}
