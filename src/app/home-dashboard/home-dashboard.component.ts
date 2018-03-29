import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
  providers: [CredentialsService]
})
export class HomeDashboardComponent implements OnInit {

  username = '';
  token = '';
  email = '';

  constructor(private credentialsService: CredentialsService, private router: Router) {
  }

  ngOnInit() {
    if (!this.credentialsService.sessionExists()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.username = this.credentialsService.getUsername().toString();
    this.token = this.credentialsService.getToken().toString();
    this.email = this.credentialsService.getEmail().toString();
    this.toggleSidebar();
  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

}
