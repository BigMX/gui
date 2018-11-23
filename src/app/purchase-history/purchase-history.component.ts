import { Account } from './../class/account';
import { InvitedRegistryService } from './../class/invited-registry.service';
import { InvitedRegistry } from './../class/invitedRegistry';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invitations } from '../class/invitation.service';
import { Registries } from '../class/registries.service';
import { Item } from '../class/item';
import { User } from '../class/user.service';

class PurchaseHistoryParams {
  id: string;
}

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  regPurchaseHistory: InvitedRegistry;
  id: number;
  currentUser: Account;

  constructor(
    private route: ActivatedRoute,
    private inReg: InvitedRegistryService,
    protected router: Router,
    private users: User
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: PurchaseHistoryParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((user) => {
          this.currentUser = user;
        });
      }
    });
  }
}
