import {Component, Input, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {FriendsService} from '../home-dashboard/friends/friends.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [CredentialsService, FriendsService]
})
export class SidebarComponent implements OnInit {


  @Input() username: string;
  numPendingRequests: number;

  constructor(private credentialService: CredentialsService, private router: Router,
              private friendsService: FriendsService) {
  }

  ngOnInit() {
    if (this.sessionExists()) {
      this.username = this.credentialService.getUsername().toString();
      this.friendsService.getMyRequestsFriends().subscribe(
        data => {
          const num = data.valueOf()['sentToMe'].length;
          if (num > 0) {
            this.numPendingRequests = num;
          }
        }
      );
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

  logout() {
    this.credentialService.logout();
    this.router.navigateByUrl('/login');
  }

}
