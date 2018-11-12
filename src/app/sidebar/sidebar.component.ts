import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Invitations } from '../class/invitation.service';
import { Invitation } from '../class/invitation';

class SidebarParams {
  id: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  registry: Registry[];
  account: Account;
  newRegistry: Registry;
  invitation: Invitation;
  id: number;
  code: string;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private invitations: Invitations,
    private users: User,
    protected router: Router
  ) { }

  // important variables initialized
  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: SidebarParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          console.log(acct);
          this.account = acct;
        });
        this.registries.getRegistries(this.id).subscribe((registry) => {
          this.registry = registry;
        });
      }
    });
  }

  // this method is used for adding a registry to the appropriate user (who's logged in)
  addRegistry() {
    this.newRegistry.userId = this.id;
    this.newRegistry.status = 'active';
    this.registries.add(this.newRegistry).subscribe((registry) => {
    });
    this.registries.getRegistries(this.id).subscribe((registry) => {
      this.registry = registry;
    });
    this.newRegistry = {};
  }
  join() {
    this.invitations.getByEmail(this.account.email,this.code).subscribe((x)=> {
      console.log(x[0]);
      x[0].status=true;
      console.log(x[0]);
      this.invitations.update(x[0]).subscribe((y)=> {
        console.log(y[0]);
      });
    });
  }
}
