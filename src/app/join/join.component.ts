import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import {Invitations} from './../class/invitation.service';
import { Invitation } from '../class/invitation';
import {Account} from '../class/account';
import { User } from '../class/user.service';

class JoinParams {
  id: string;
}

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registries: Registries,
    private invitations: Invitations,
    private users: User,
  ) { }

  id: number;
  account: Account;
  code: string;
  message: string;
  in: boolean;

  ngOnInit() {
    this.in=true;
    this.route.params.subscribe((params: JoinParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          console.log(acct);
          this.account = acct;
        });
      }
    });
  }

  join() {
    this.invitations.getByEmail(this.account.email,this.code).subscribe((x)=> {
      console.log(x);
      if(x[0]===undefined) {
        this.message='wrong code or no invitation';
      } else {
        this.message='You are in';
        this.in=false;
      }
      x[0].status=true;
      this.invitations.update(x[0]).subscribe((y)=> {
      });
      this.code='';
      if(x[0]===undefined) {
        this.message='wrong code or no invitation';
      } else {
        this.message='You are in';
        this.in=false;
      }
    });
  }

  lead() {
    const url='dashboard/'+this.account.user_id;
    this.router.navigateByUrl(url);
  }
}
