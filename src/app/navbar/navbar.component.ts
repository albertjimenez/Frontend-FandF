import {Component, HostListener, OnInit} from '@angular/core';
import {CredentialsService} from '../credentials.service';
import * as $ from 'jquery';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CredentialsService, TranslateService]
})
export class NavbarComponent implements OnInit {

  isMobile = false;
  languageList = ['flag-spain', 'flag-uk', 'flag-cat'];
  i18nLanguageList = ['es', 'en', 'ca'];
  indexList = 0;
  countryFlag = 'flag-spain';

  constructor(private credentialsService: CredentialsService, private translateService: TranslateService) {
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

  translate() {
    this.indexList += 1;
    const newIndex = this.indexList % this.languageList.length;
    this.countryFlag = this.languageList[newIndex];
    this.translateService.use(this.i18nLanguageList[newIndex]);
  }
}
