import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Invitations } from '../class/invitation.service';
import { Invitation } from '../class/invitation';

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
  test: number;
  invitation: Invitation;

  constructor(
    private route: ActivatedRoute,
    private invitations: Invitations,
    private registries: Registries,
    private users: User,
    protected router: Router
  ) { }

  // important variables initialized
  ngOnInit() {
    this.test = 1;
    this.newRegistry = new Registry;
    this.inviteReg = [];
    this.route.params.subscribe((params: DashboardParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct[0];
          this.invitation = new Invitation;
          this.invitation.receiverEmail = this.account.email;
          this.invitations.getAll(this.invitation).subscribe((x) => {
            for (const y of x) {
              this.registries.getRegById(y.registry_id).subscribe((registry) => {
                this.inviteReg.push(registry[0]);
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

