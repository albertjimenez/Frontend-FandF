import {Component, HostListener, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CredentialsService]
})
export class NavbarComponent implements OnInit {

  isMobile = true;

  constructor(private credentialsService: CredentialsService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 700;
  }

  ngOnInit() {
  }

  hideButtonOnExistSession(): Boolean {
    return this.credentialsService.sessionExists();
  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

  logout() {
    this.toggleSidebar();
    this.credentialsService.logout();
  }
}
