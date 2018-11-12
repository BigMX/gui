import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Invitations } from '../class/invitation.service';

class DashboardParams {
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registry: Registry[];
  inviteReg: Registry[];
  account: Account;
  newRegistry: Registry;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private invitations: Invitations,
    private registries: Registries,
    private users: User,
    protected router: Router
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.inviteReg=[];
    this.route.params.subscribe((params: DashboardParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct;
          this.invitations.getAll(this.account.email).subscribe((x) => {
            for( const y of x) {
              this.registries.getRegById(y.registryId).subscribe((registry) => {
                this.inviteReg.push(registry);
                console.log(registry);
              });
            }
          });
        });
        this.registries.getRegistries(this.id).subscribe((registry) => {
          this.registry = registry;
        });
      }
    });
  }
}

