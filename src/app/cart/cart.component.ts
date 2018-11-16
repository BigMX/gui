import { Item } from './../class/item';
import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import { User } from '../class/user.service';

class CartParams {
  id: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  registry: Registry[];
  cart: Item[];
  newItem: Item;
  newRegistry: Registry;
  account: Account;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User
  ) { }

  // important variables initialized
  ngOnInit() {
    this.newRegistry = new Registry;
    this.newItem = new Item;
    this.route.params.subscribe((params: CartParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((account) => {
          this.account = account;
          this.cart = account.cart;
        });
      }
    });
  }

  // this method is for adding an item to the cart - the status is set to need
  addItem() {
    this.newItem.status = 'need';
    this.cart.push(this.newItem);
    this.account.cart = this.cart;
    this.users.addItemToCart(this.account).subscribe((account) => {

    });
    this.newItem = {};
  }

  // used for removing items from the cart
  removeItem(id: number, index:number) {
    if (window.confirm('Are you sure?')) {
      this.users.getById(this.id).subscribe((acct) => {
        this.account = acct;
        this.account.cart.splice(index, 1);
        console.log(this.account);
        this.users.removeNotif(this.account).subscribe(()=> {
        });
        location.reload();
      });
    }
  }
}
