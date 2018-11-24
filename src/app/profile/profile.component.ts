import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';

class ProfileParams {
  id: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    protected router: Router
  ) { }

  account: Account;
  id: number;
  notifCount: number;
  password: string;
  newPassword1: string;
  newPassword2: string;
  success: boolean;
  message: string;

  ngOnInit() {
    this.success=true;
    this.route.params.subscribe((params: ProfileParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct[0];
        });
      }
    });
  }

  update() {
    if(this.newPassword1!==this.newPassword2) {
      window.confirm('two new passwords are not same');
    } else {
      if(this.password !== this.account.password) {
        window.confirm('wrong old password');
      } else {
        this.account.password= this.newPassword1;
        this.users.updatePassword(this.account).subscribe((x)=> {
          this.message='You successfully changed your password';
        });
      }
    }
    this.newPassword1='';
    this.newPassword2='';
    this.password='';
    this.success=false;
  }
}
