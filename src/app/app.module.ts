import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginService} from './login/login.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import {FriendsComponent} from './home-dashboard/friends/friends.component';
import {TopScrollComponent} from './top-scroll/top-scroll.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {GmapsComponent} from './gmaps/gmaps.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {DialogEditEventComponent, GeneralEventsComponent} from './general-events/general-events.component';
import {
  DialogCallComponent,
  DialogEditGroupComponent,
  GeneralGroupsComponent
} from './general-groups/general-groups.component';
import {EventCreatorComponent} from './general-events/event-creator/event-creator.component';
import {AssistantEventComponent} from './general-events/event-creator/assistant-event/assistant-event.component';
import {AuthInterceptorService} from './auth-interceptor.service';
import {AvatarModule} from 'ngx-avatar';
import {LogospinnerComponent} from './logospinner/logospinner.component';
import {CreateGroupComponent} from './general-groups/creategroupbutton/create-group/create-group.component';
import {CreategroupbuttonComponent} from './general-groups/creategroupbutton/creategroupbutton.component';
import {DialogFriendRequestsComponent, GeneralFriendsComponent} from './general-friends/general-friends.component';
import {AssistantComponent} from './general-friends/friend-search/assistant/assistant.component';
import {FriendSearchComponent} from './general-friends/friend-search/friend-search.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home-dashboard', component: HomeDashboardComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'events', component: EventsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'gmaps', component: GmapsComponent},
  {path: 'my-events', component: GeneralEventsComponent},
  {path: 'my-groups', component: GeneralGroupsComponent},
  {path: 'my-friends', component: GeneralFriendsComponent},
  {path: 'search-friend', component: AssistantComponent},
  {path: 'assistant-event', component: AssistantEventComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: 'add-friend', component: AssistantComponent},
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
    GroupsComponent,
    FriendsComponent,
    TopScrollComponent,
    GmapsComponent,
    GeneralEventsComponent,
    GeneralGroupsComponent,
    EventCreatorComponent,
    AssistantEventComponent,
    LogospinnerComponent,
    CreateGroupComponent,
    GeneralFriendsComponent,
    CreategroupbuttonComponent,
    DialogCallComponent,
    DialogEditEventComponent,
    DialogEditGroupComponent,
    FriendSearchComponent,
    AssistantComponent,
    DialogFriendRequestsComponent
  ],
  entryComponents: [GeneralGroupsComponent, DialogCallComponent, GeneralEventsComponent,
    DialogEditEventComponent, DialogEditGroupComponent, DialogFriendRequestsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule, ReactiveFormsModule, MatMenuModule, MatTooltipModule, MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    GooglePlaceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(), // ToastrModule added
    AvatarModule
  ],
  providers: [LoginService, HttpClient, CredentialsService, RegisterService, HeaderService, ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
