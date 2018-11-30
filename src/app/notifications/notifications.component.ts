import { Notifs } from './../class/notifs.service';
import { Registries } from './../class/registries.service';
import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/user.service';
import { Registry } from '../class/registry';
import { Notif } from '../class/notifications';
import { Cart } from '../class/cart.service';
import { Item } from '../class/item';

class NotificationsParams {
  id: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  id: number;
  account: Account;
  registryList: Registry[] = [];
  notifications: Notif[] = [];
  length: number;
  notif: Notif;

  constructor(
    private route: ActivatedRoute,
    private users: User,
    private registries: Registries,
    private notifs: Notifs,
    private carts: Cart
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: NotificationsParams) => {
      this.notif = new Notif;
      if (params.id) {
        this.id = +params.id;
        this.registries.getRegistries(this.id).subscribe((registries) => {
          this.registryList = registries;
          this.check();
        });
        this.notifs.getNotifs(this.id).subscribe((n) => {
          this.notifications = n;
          this.length = n.length;
          console.log(this.notifications);
          this.users.getById(this.id).subscribe((account) => {
            this.account = account;
          });
        });
      }
    });
  }

  // this method removes a notification when the 'x' on it is clicked - user notifications are updated to reflect the change
  removeAlert(n: Notif) {
    this.notifs.removeNotif(n.notification_id).subscribe((n2) => {
    });
    console.log(this.notifications);
  }

  // this method makes sure that no duplicate items are added to a registry
  arrayObjectIndexOf(myArray, searchTerm) {
    let i;
    for(i = 0; i < myArray.length; i++) {
        if (myArray[i].notifications === searchTerm) {
          return i;
        }
    }
    return -1;
  }

  // this method checks for newer notifications
  // checks to see if all items for each registry have been bought, and avoids duplicate alerts
  // this is done for all of the user's /active/ registries
  check() {
        let i;
        let j;
        let counter = 0;
        console.log(this.registryList);
        // tslint:disable-next-line:forin
        for(i = 0; i < this.registryList.length; i++) {
          const message = 'all items have been bought for: ' + this.registryList[i].name + ' registry!!!!';
          let regItems;
          this.carts.getItemsByReg(this.registryList[i].registry_id).subscribe((items) => {
            regItems = items;

            if (regItems !== 0) {
              for (j = 0; j < regItems.length; j++) {
                const item = regItems[j];
                if (item.status === 'Bought') {
                  counter+=1;
                  console.log(counter);
                }
              }
              if (counter === regItems.length && this.arrayObjectIndexOf(this.notifications, message) === -1) {
                this.notif.notifications = message;
                this.notif.user_id = this.id;
                this.notifications.push(this.notif);
                this.length += 1;
                this.notifs.addNotifs(this.notif).subscribe((n) => {

                });
                this.notif = new Notif;
              }
            }
        });
        }
  }

}
