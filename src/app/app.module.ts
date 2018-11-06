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

// services
import { Registries } from './class/registries.service';

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
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'invite', component: InviteComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'cart', component: CartComponent },
      { path: 'registry',children: [
        {
          path: '',
          component: RegistryComponent
        },
        {
          path: ':id',
          component: RegistryComponent
        }
      ] },
      { path: '', redirectTo: defaultRoute, pathMatch: 'full' },
      { path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule],
  providers: [Registries],
  bootstrap: [AppComponent]
})
export class AppModule { }
