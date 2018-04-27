import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsService {

  private notif = Notification as any;

  constructor() {
  }

  askPermission(thenFunction: (value) => String, catchFunction: (reason) => any) {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta las notificaciones del sistema');
    } else if (this.notif.permission !== 'denied') {

      try {
        Notification.requestPermission().then(thenFunction).catch(catchFunction);
      } catch {
        console.log('Safari');
      }
    }
  }

  showNotification(title: string, body: string, icon = 'assets/logo/fandflogo.png') {
    if (this.notif.permission === 'granted') {
      // Si esta correcto lanzamos la notificación
      const notification = new Notification(title, {body: body, icon: icon});
    }
  }
}
