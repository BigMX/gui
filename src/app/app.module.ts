import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { InviteComponent } from './invite/invite.component';
import { RegistryComponent } from './registry/registry.component';
import { CartComponent } from './cart/cart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebuttonsComponent } from './sidebuttons/sidebuttons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewRegistryComponent } from './view-registry/view-registry.component';

// services
import { Registries } from './class/registries.service';
import { User } from './class/user.service';
import { Invitations } from './class/invitation.service';
import { ProfileComponent } from './profile/profile.component';
import { JoinComponent } from './join/join.component';
import { Notifs } from './class/notifs.service';
import { StartComponent } from './start/start.component';

const defaultRoute = 'login';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    ArchiveComponent,
    InviteComponent,
    LogInComponent,
    RegistryComponent,
    CartComponent,
    SidebarComponent,
    SidebuttonsComponent,
    NotificationsComponent,
    ProfileComponent,
    JoinComponent,
    ViewRegistryComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'join', children: [
        {
          path: '',
          component: JoinComponent
        },
        {
          path: ':id',
          component: JoinComponent
        }
      ] },
      { path: 'dashboard', children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: ':id',
            component: DashboardComponent
          }
        ] },
      { path: 'invite', children: [
          {
            path: '',
            component: InviteComponent
          },
          {
            path: ':id',
            component: InviteComponent
          }
       ] },
      { path: 'archive', children: [
          {
            path: '',
            component: ArchiveComponent
          },
          {
            path: ':id',
            component: ArchiveComponent
          }
       ] },
      { path: 'login', component: LogInComponent },
      { path: 'start', component: StartComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'profile', children: [
        {
          path: '',
          component: ProfileComponent
        },
        {
          path: ':userid',
          component: ProfileComponent
        }
      ]},
      { path: 'cart',  children: [
        {
          path: '',
          component: CartComponent
        },
        {
          path: ':id',
          component: CartComponent
        }
      ] },
      { path: 'registry',children: [
        {
          path: '',
          component: RegistryComponent
        },
        {
          path: ':userid/:regid',
          component: RegistryComponent
        }
      ] },
      { path: 'viewRegistry',children: [
        {
          path: '',
          component: ViewRegistryComponent
        },
        {
          path: ':userid/:regid',
          component: ViewRegistryComponent
        }
      ] },
      { path: 'notifications', children: [
        {
          path: '',
          component: NotificationsComponent
        },
        {
          path: ':id',
          component: NotificationsComponent
        }
      ] },
      { path: '', redirectTo: defaultRoute, pathMatch: 'full' },
      { path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule],
  providers: [Registries, User,Invitations, Notifs],
  bootstrap: [AppComponent]
})
export class AppModule { }
