import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [CredentialsService]
})
export class SidebarComponent implements OnInit {

  username = '';

  constructor(private credentialService: CredentialsService) {
  }

  ngOnInit() {
    if (this.credentialService.sessionExists()) {
      this.username = this.credentialService.getUsername().toString();
    }
  }

}
