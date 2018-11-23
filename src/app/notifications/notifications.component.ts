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
          console.log(this.id)
          this.check();
        });
        this.notifs.getNotifs(this.id).subscribe((n) => {
          this.notifications = n;
          if(n!==undefined){
          this.length = n.length;
          } else {
            this.length = 0;
          }
          console.log(this.notifications);
          this.users.getById(this.id).subscribe((account) => {
            this.account = account;
          })
        });
      }
    });
  }

  // this method removes a notification when the 'x' on it is clicked - user notifications are updated to reflect the change
  removeAlert(n: Notif) {
    console.log(n);
    this.notifs.removeNotif(n.notification_id).subscribe((n) => {
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
    console.log(i)
    return -1;
  }

  // this method checks for newer notifications
  // checks to see what items have been bought to alert the user of such purchases, and avoids duplicate alerts
  // it also checks to see if all of the items in a given registry have been purchased and alerts accordingly
  // this is done for all of the user's /active/ registries
  check() {
        let i;
        let j;
        let counter = 0;
        console.log(this.registryList);
        // tslint:disable-next-line:forin
        for(i = 0; i < this.registryList.length; i++) {
          const message = 'all items have been bought for: ' + this.registryList[i].name + '!!!!';
          this.notifs.getNotifs(this.id).subscribe((n) => {
            this.notifications = n;
            if (this.registryList[i].items === null && this.arrayObjectIndexOf(this.notifications, message) === -1) {
              this.notif.notifications = message;
              this.notif.user_id = this.id;
              this.notifs.addNotifs(this.notif).subscribe((n) => {
               });
             this.notif = new Notif;
           } else if (this.registryList[i].items !== null && this.arrayObjectIndexOf(this.notifications, message) === -1) {
            for (j = 0; j < this.registryList[i].items.length; j++) {
              const item = this.registryList[i].items[j];
              const message = item.name + ', has been bought!!!';
              this.notifs.getNotifs(this.id).subscribe((n) => {
                this.notifications = n;
                if (item.status === 'bought' && this.arrayObjectIndexOf(this.notifications, message) === -1) {
                  counter+=1;
                  this.notif.notifications = message;
                  this.notif.user_id = this.id;
                    console.log(this.notif);
                    this.notifs.addNotifs(this.notif).subscribe((n) => {
                   });
                  this.notif = new Notif;
                }
              });
            } } else {
            const message = 'all items have been bought for: ' + this.registryList[i].name + '!!!!';
            this.notifs.getNotifs(this.id).subscribe((n) => {
              this.notifications = n;
              if (this.registryList[i].items !== null && counter === this.registryList[i].items.length && this.arrayObjectIndexOf(this.notifications, message) === -1) {
                this.notif.notifications = message;
                this.notif.user_id = this.id;
                this.notifs.addNotifs(this.notif).subscribe((n) => {
                 });
                this.notif = new Notif;
              }
            });
          }
          });
        }
  }

}
