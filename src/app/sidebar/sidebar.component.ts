import {Component, Input, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import {NavigationStart, Router} from '@angular/router';
import * as $ from 'jquery';
import {FriendsService} from '../home-dashboard/friends/friends.service';
import {NotificationsService} from '../notifications.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [CredentialsService, FriendsService, NotificationsService]
})
export class SidebarComponent implements OnInit {


  @Input() username: string;
  numPendingRequests: number;
  getMyRequests = (data) => {
    const num = data.valueOf()['sentToMe'].length;
    if (num > 0) {
      this.numPendingRequests = num;
    } else {
      this.numPendingRequests = 0;
    }
  }

  constructor(private credentialService: CredentialsService, private router: Router,
              private friendsService: FriendsService, private notificationService: NotificationsService) {
  }

  ngOnInit() {
    if (this.sessionExists()) {
      this.username = this.credentialService.getUsername().toString();
      this.friendsService.getMyRequestsFriends().subscribe(
        data => this.getMyRequests(data)
      );
      this.router.events.subscribe((e) => {
        this.friendsService.getMyRequestsFriends().subscribe(
          data => {
            this.getMyRequests(data);
            const action = () => this.router.navigateByUrl('/my-friends');
            if (this.numPendingRequests > 0 && e instanceof NavigationStart) {
              this.notificationService.showNotification('Petición de amistad', 'Has recibido una nueva petición de amistad',
                action);
            }
          }
        );
      });
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
