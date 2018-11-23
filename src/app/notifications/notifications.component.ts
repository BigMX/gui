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
  notifs: string[] = [];
  nObj: Notif;

  constructor(
    private route: ActivatedRoute,
    private users: User,
    private registries: Registries,
    private notificts: Notifs
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: NotificationsParams) => {
      if (params.id) {
        this.id = +params.id;
        this.registries.getRegistries(this.id).subscribe((registries) => {
          this.registryList = registries;
        });
        this.notificts.getNotifs(this.id).subscribe((n) => {
          if (n.notifications !== undefined) {
            this.notifs = n.notifications;
          }
          this.nObj = n[0];
          console.log(this.nObj);
          this.users.getById(this.id).subscribe((account) => {
            this.account = account;
          });
          this.check();
        });
      }
    });
  }

  // this method removes a notification when the 'x' on it is clicked - user notifications are updated to reflect the change
  removeAlert(notif: string) {
    const index = this.notifs.indexOf(notif);
    this.notifs.splice(index, 1);
    this.nObj.notifications = this.notifs;
    console.log(this.nObj);
    this.notificts.removeNotif(this.nObj.id, this.nObj).subscribe((n) => {
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
      const registry = this.registryList[i];
      if (registry.items === undefined) {
        const message = 'all items have been bought for: ' + registry.name + '!!!!';
        if(this.notifs.indexOf(message)===-1) {
          this.notifs.push(message);
        }
      }
       let j;
       if(registry.items!==undefined) {
          let counter = 0;
          for (j = 0; j < registry.items.length; j++) {
            const item = registry.items[j];
            if (item.status === 'bought') {
              counter+=1;
              const message = item.name + ', has been bought!!!';
              if(this.notifs.indexOf(message)===-1) {
                this.notifs.push(message);
              }
            }
          }
          if (counter === registry.items.length) {
            const message = 'all items have been bought for: ' + registry.name + '!!!!';
            if(this.notifs.indexOf(message)===-1) {
            this.notifs.push(message);
            }
          }
       }
    }
    this.nObj.notifications = this.notifs;
    this.notificts.addNotif(this.nObj.id, this.nObj).subscribe((n) => {

    });
  }

}