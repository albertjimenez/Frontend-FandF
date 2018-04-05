import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginService} from './login/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeDashboardComponent} from './home-dashboard/home-dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CredentialsService} from './credentials.service';
import {RegisterService} from './register/register.service';
import {HeaderService} from './header.service';
import {ProfileService} from './profile.service';
import {EventsComponent} from './home-dashboard/events/events.component';
import {GroupsComponent} from './home-dashboard/groups/groups.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home-dashboard', component: HomeDashboardComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'events', component: EventsComponent},
  {path: '**', redirectTo: 'login'}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    EventsComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule, ReactiveFormsModule, MatMenuModule, MatTooltipModule, MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [LoginService, HttpClient, CredentialsService, RegisterService, HeaderService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
