import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import {LoginService} from './login/login.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'login'}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [LoginService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
