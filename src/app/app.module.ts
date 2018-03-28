import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {FooterComponent} from './footer/footer.component';
import {LoginService} from './login/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { GmapsComponent } from './gmaps/gmaps.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'gmaps', component: GmapsComponent},
  {path: '**', redirectTo: 'login'}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    GmapsComponent
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
    MatCardModule,
    GooglePlaceModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
