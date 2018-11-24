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
  length: number;
  newItem: Item;
  newRegistry: Registry;
  account: Account;
  id: number;
  claimed: Item[]=[];
  bought: Item[];
  notif: Notif;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    private notifs: Notifs,
    private cartItems: Cart,
    protected router: Router
  ) { }

    // important variables initialized
    ngOnInit() {
      this.newRegistry = new Registry;
      this.newItem = new Item;
      this.route.params.subscribe((params: CartParams) => {
        if (params.id) {
          this.id = +params.id;
          console.log(this.id);
          this.users.getById(this.id).subscribe((account) => {
            this.account = account;
          });
          this.cartItems.getItems(this.id).subscribe((c) => {
            console.log(c);
            this.cart = c;
            this.length = c.length;
          });
        }
      });
    }

  // this method is for adding an item to the cart - the status is set to need
  addItem() {
    this.newItem.status = 'unclaimed';
    this.newItem.user_id = this.id;
    this.newItem.disabled = 'false';
    console.log(this.newItem);
    this.cartItems.addItemToCart(this.newItem).subscribe((itemS) => {
      console.log(itemS);
    });
    this.newItem = {};
    this.cartItems.getItems(this.id).subscribe((c) => {
      this.cart = c;
      let url='cart/';
      url+=this.id;
      this.router.navigateByUrl(url);
      location.reload();
    });
  }

    // used for removing items from the cart
    removeItem (item_id: number) {
      if (window.confirm('Are you sure?')) {
        this.cartItems.deleteItem(item_id).subscribe((item) => {
          location.reload();
        });
      }
    }

  markAsBought(index: number) {
    // // deleting item from claimed
    // console.log(this.account.id);

    // console.log(this.notifObj);
    // this.notifObj.notifications.push(this.claimed[index].name + ', has been bought!!!');
    // this.notifs.addNotif(this.account.id, this.notifObj).subscribe((x) => {

    // });
    // this.bought.push(this.claimed[index]);
    // this.claimed.splice(index, 1);
    // this.account.boughtItems = this.bought;
    // this.account.claimed = this.claimed;
    // this.users.updateAccount(this.account).subscribe((x) => {

    // });
    this.cartItems.buyItem(this.claimed[index].item_id).subscribe((x)=> {
      console.log(x);
      this.claimed.splice(index,1);
    });
  }
}
