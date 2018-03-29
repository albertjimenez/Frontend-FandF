import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [CredentialsService]
})
export class SidebarComponent implements OnInit {

  username = '';

  constructor(private credentialService: CredentialsService, private router: Router) {
  }

  ngOnInit() {
    if (this.sessionExists()) {
      this.username = this.credentialService.getUsername().toString();
      this.router.navigateByUrl('/home-dashboard');
    } else {
      this.toggleSidebar();
      this.router.navigateByUrl('/login');
    }
  }

  sessionExists() {
    return this.credentialService.sessionExists();
  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

}
