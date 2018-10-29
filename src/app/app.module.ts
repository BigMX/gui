import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { LogInComponent } from './log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { InviteComponent } from './invite/invite.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const defaultRoute = 'login';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    ArchiveComponent,
    InviteComponent,
    LogInComponent,
  ],
  imports: [
    ModalModule,
    BrowserModule,
    FormsModule,
    ModalDialogModule.forRoot(),
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      {path: 'invite', component: InviteComponent},
      {path: 'archive', component: ArchiveComponent},
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '', redirectTo: defaultRoute, pathMatch: 'full' },
      { path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
