import {Component, Input, OnInit} from '@angular/core';
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


  @Input() username: string;

  constructor(private credentialService: CredentialsService, private router: Router) {
  }

  ngOnInit() {
    if (this.sessionExists()) {
      this.username = this.credentialService.getUsername().toString();
    }
    this.router.events.subscribe((event) => {
      console.log(event);
    });
  }

  sessionExists() {
    return this.credentialService.sessionExists();
  }

  toggleSidebar() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

  logout() {
    this.credentialService.logout();
    this.router.navigateByUrl('/login');
  }

}
