import { Item } from './../class/item';
import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import { User } from '../class/user.service';
import { Notifs } from '../class/notifs.service';
import { Notif } from '../class/notifications';
import { Cart} from '../class/cart.service';

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
  cartLen: number;
  newItem: Item;
  newRegistry: Registry;
  account: Account;
  id: number;
  claimed: Item[]=[];
  length: number;
  bought: Item[];
  notifObj: Notif;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    private notifs: Notifs,
    private carts: Cart
  ) { }

  // important variables initialized
  ngOnInit() {
    this.newRegistry = new Registry;
    this.newItem = new Item;
    this.cart= [];
    this.route.params.subscribe((params: CartParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((account) => {
          this.account = account;
          this.carts.getItems(this.id).subscribe((items)=> {
            this.cart=items;
            this.cartLen = items.length;
          });
          this.carts.getClaimedItem(this.id).subscribe((items)=> {
            this.claimed=items;
            this.length = items.length;
          });
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
    this.newItem.user_id=this.id;
    this.cart.push(this.newItem);
    this.carts.addItemToCart(this.newItem).subscribe((account) => {
      this.cartLen += 1;
    });
    this.newItem = {};
  }

  // used for removing items from the cart
  removeItem(id: number, index:number) {
    if (window.confirm('Are you sure?')) {
      this.carts.getItems(this.id).subscribe((items)=> {
        this.cart=items;
        this.carts.deleteItem(this.cart[index].item_id).subscribe((x)=> {
          this.cartLen -=1;
          this.cart.splice(index,1);
        });
      });
    }
  }

  // when an item is bought, the registry owner will be notified
  markAsBought(index: number) {
    this.carts.buyItem(this.claimed[index].item_id).subscribe((x)=> {
      this.claimed.splice(index,1);
    });
    const n = new Notif;
    const message = this.claimed[index].name + ', has been bought';
    n.notifications = message;
    n.user_id = this.claimed[index].user_id;
    this.notifs.addNotifs(n).subscribe((n2) => {
    });
  }
}
