import { Notifs } from './../class/notifs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';

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

  update() {
    if(this.newPassword1!==this.newPassword2) {
      window.confirm('two new Passwords are not same');
    } else {
      if(this.account.password!==this.password) {
        window.confirm('wrong old password');
      } else {
        this.users.updatePassword(this.account).subscribe((x)=> {

        });
      }
    }
    this.newPassword1='';
    this.newPassword2='';
    this.password='';
  }

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    protected router: Router,
    protected notifs: Notifs
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: SidebuttonsParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct;
          this.notifs.getNotifs(this.id).subscribe((n) => {
            if(n[0]!==undefined && n[0].notifications !== undefined) {
              this.notifCount = n[0].notifications.length;
            } else {
              this.notifCount = 0;
            }
          });
        });
      }
    });
  }

}
