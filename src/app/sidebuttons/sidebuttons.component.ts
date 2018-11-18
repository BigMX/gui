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
    protected router: Router
  ) { }

  // important variables initialized
  ngOnInit() {
    this.route.params.subscribe((params: SidebuttonsParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct;
          if(this.account.notifications !== undefined) {
          this.notifCount = this.account.notifications.length;
          } else {
            this.notifCount = 0;
          }
        });
      }
    });
  }

}
