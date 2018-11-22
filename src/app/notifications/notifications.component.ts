import { Notifs } from './../class/notifs.service';
import { Registries } from './../class/registries.service';
import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/user.service';
import { Registry } from '../class/registry';
import { Notif } from '../class/notifications';

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
    private notifs: Notifs
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: NotificationsParams) => {
      this.notif = new Notif;
      if (params.id) {
        this.id = +params.id;
        this.registries.getRegistries(this.id).subscribe((registries) => {
          this.registryList = registries;
          console.log(this.registryList);
        });
        this.notifs.getNotifs(this.id).subscribe((n) => {
          this.notifications = n;
          this.length = n.length;
          console.log(n);
          this.users.getById(this.id).subscribe((account) => {
            this.account = account;
          })
        });
      }
    });
  }

  // this method removes a notification when the 'x' on it is clicked - user notifications are updated to reflect the change
  removeAlert(id: number) {
    this.notifs.removeNotif(id).subscribe((n) => {
      // console.log(account);
    });
  }

  // this method checks for newer notifications
  // checks to see what items have been bought to alert the user of such purchases, and avoids duplicate alerts
  // it also checks to see if all of the items in a given registry have been purchased and alerts accordingly
  // this is done for all of the user's /active/ registries
  check() {
        let i;
        // tslint:disable-next-line:forin
        for(i = 0; i < this.registryList.length; i++) {
          // if (this.registryList[i].items === null) {
          //   const message = 'all items have been bought for: ' + this.registryList[i].name + '!!!!';
          //   this.notif.notifications = message;
          //   this.notif.user_id = this.id;
          //   this.notifs.addNotifs(this.notif).subscribe((n) => {
          //     console.log(n);
          //   });
          //   this.notif = new Notif;
          // }
          let j;
          let counter = 0;
          if (this.registryList[i].items!==null) {
            for (j = 0; j < this.registryList[i].items.length; j++) {
              const item = this.registryList[i].items[j];
              if (item.status === 'bought') {
                counter+=1;
                const message = item.name + ', has been bought!!!';
                this.notif.notifications = message;
                this.notif.user_id = this.id;
                this.notifs.addNotifs(this.notif).subscribe((n) => {
                  console.log(n);
                });
                this.notif = new Notif;
              }
            }
          }
          if (counter === this.registryList[i].items.length) {
            const message = 'all items have been bought for: ' + this.registryList[i].name + '!!!!';
            this.notif.notifications = message;
            this.notif.user_id = this.id;
            this.notifs.addNotifs(this.notif).subscribe((n) => {
              console.log(n);
            });
            this.notif = new Notif;
          }
        }
  }

}
