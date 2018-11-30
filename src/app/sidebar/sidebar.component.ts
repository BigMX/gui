import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Invitations } from '../class/invitation.service';
import { Invitation } from '../class/invitation';
import { Output } from '@angular/core';

class SidebarParams {
  id: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  @Output()
  registry: Registry[];

  account: Account;
  newRegistry: Registry;
  invitation: Invitation;

  @Input()
  id: number;
  code: string;
  @Input()
  test: number;

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
          this.account = acct;
        });
      }
    });
  }
}
