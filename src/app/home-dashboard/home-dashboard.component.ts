import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
  providers: [CredentialsService]
})
export class HomeDashboardComponent implements OnInit {

  username = '';

  constructor(private credentialsService: CredentialsService) {
  }

  ngOnInit() {
    this.username = this.credentialsService.getUsername().toString();
  }

}
