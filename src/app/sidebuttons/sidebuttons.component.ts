import { Notifs } from './../class/notifs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Cart } from '../class/cart.service';

class SidebuttonsParams {
  id: string;
}

@Component({
  selector: 'app-sidebuttons',
  templateUrl: './sidebuttons.component.html',
  styleUrls: ['./sidebuttons.component.css']
})
export class SidebuttonsComponent implements OnInit {

  account: Account;
  id: number;
  notifCount: number;
  password: string;
  newPassword1: string;
  newPassword2: string;
  itemCount: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    protected router: Router,
    protected notifs: Notifs,
    private cart: Cart
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: SidebuttonsParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct[0];
          this.notifs.getNotifs(this.id).subscribe((n) => {
            if(n!==undefined) {
              this.notifCount = n.length;
            } else {
              this.notifCount = 0;
            }
          });
        });
        this.cart.getItems(this.id).subscribe((items) => {
          this.itemCount = items.length;
        });
      }
    });
  }

}
