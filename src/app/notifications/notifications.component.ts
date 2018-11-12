import { Account } from './../class/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/user.service';

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
  notifs: string[];

  constructor(
    private route: ActivatedRoute,
    private users: User
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: NotificationsParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((account) => {
          this.notifs = account.notifications;
          this.account = account;
        });
      }
    });
  }

  removeAlert(notif: string) {
    const index = this.notifs.indexOf(notif);
    this.notifs.splice(index, 1);
    this.account.notifications = this.notifs;
    this.users.removeNotif(this.account).subscribe((account) => {
      console.log(account);
    });
  }

}
