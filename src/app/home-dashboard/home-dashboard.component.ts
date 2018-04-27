import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import '../../assets/scroller.js';
import {WebsocketHomeService} from '../websocket-home.service';
import {ToastrService} from 'ngx-toastr';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
  providers: [CredentialsService, WebsocketHomeService, ToastrService, NotificationsService]
})
export class HomeDashboardComponent implements OnInit {

  username = '';
  token = '';
  email = '';

  constructor(private credentialsService: CredentialsService, private router: Router,
              private wsservice: WebsocketHomeService, private toastrService: ToastrService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    if (!this.credentialsService.sessionExists()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.username = this.credentialsService.getUsername().toString();
    this.token = this.credentialsService.getToken().toString();
    this.email = this.credentialsService.getEmail().toString();
    this.notificationService.askPermission(value => {
      console.log('Ok notificaciones', value);
      this.notificationService.showNotification('Prueba', 'Esto es una prueba bro');
      return 'ok';
    }, (reason => console.log('Error, denied')));

  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }
}
