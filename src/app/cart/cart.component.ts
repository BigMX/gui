import { Item } from './../class/item';
import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import { User } from '../class/user.service';
import { Notifs } from '../class/notifs.service';
import { Notif } from '../class/notifications';

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
  claimed: Item[];
  bought: Item[];
  notifObj: Notif;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    private notifs: Notifs
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
          if (account.boughtItems === undefined) {
            account.boughtItems = [];
          }
          if (account.claimed === undefined) {
            account.claimed = [];
          }
          this.cart = account.cart;
          this.claimed = account.claimed;
          this.bought = account.boughtItems;
        });
      }
    });
    this.notifs.getNotifs(this.id).subscribe((notifications) => {
      this.notifObj = notifications[0];
    });
  }

  // this method is for adding an item to the cart - the status is set to need
  addItem() {
    this.newItem.status = 'Unclaimed';
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
        this.account.cart=this.account.cart;
        // this.users.removeNotif(this.account).subscribe(()=> {
        // });
        // location.reload();
      });
    }
  }

  markAsBought(index: number) {
    // deleting item from claimed
    console.log(this.account.id);

    console.log(this.notifObj);
    this.notifObj.notifications.push(this.claimed[index].name + ', has been bought!!!');
    this.notifs.addNotif(this.account.id, this.notifObj).subscribe((x) => {

    });
    this.bought.push(this.claimed[index]);
    this.claimed.splice(index, 1);
    this.account.boughtItems = this.bought;
    this.account.claimed = this.claimed;
    this.users.updateAccount(this.account).subscribe((x) => {

    });
  }
}