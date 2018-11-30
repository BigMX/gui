import { Account } from './../class/account';
import { InvitedRegistry } from './../class/invitedRegistry';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../class/item';
import { User } from '../class/user.service';
import { Cart } from '../class/cart.service';

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
  boughtItems: Item[]=[];
  length: number;
  currentUser: Account;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private users: User,
    private carts: Cart,
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: PurchaseHistoryParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((user) => {
          this.currentUser = user;
        });
        this.carts.getBoughtItem(this.id).subscribe((x)=> {
          this.boughtItems=x;
          this.length = x.length;
          console.log(x);
        });
      }
    });
  }
}
