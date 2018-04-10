import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import '../../assets/scroller.js';
import {WebsocketHomeService} from "../websocket-home.service";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
  providers: [CredentialsService, WebsocketHomeService]
})
export class HomeDashboardComponent implements OnInit {

  username = '';
  token = '';
  email = '';

  constructor(private credentialsService: CredentialsService, private router: Router, private wsservice: WebsocketHomeService) {
  }

  ngOnInit() {
    if (!this.credentialsService.sessionExists()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.username = this.credentialsService.getUsername().toString();
    this.token = this.credentialsService.getToken().toString();
    this.email = this.credentialsService.getEmail().toString();

  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }
}
