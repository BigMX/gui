import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import {Invitations} from './../class/invitation.service';
import { Invitation } from '../class/invitation';
import {Account} from '../class/account';
import { User } from '../class/user.service';
import { Viewer } from '../class/viewers';
import { Update } from '../class/update';

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
  viewer: Viewer;
  currentReg: Registry;
  invitation: Invitation;

  // important variables initialized
  ngOnInit() {
    this.in=true;
    this.viewer=new Viewer;
    this.route.params.subscribe((params: JoinParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct[0];
        });
      }
    });
  }

  // this is used for joining a registry that you were invited to
  join() {
    this.invitation=new Invitation;
    this.invitation.Code=this.code;
    this.invitation.receiverEmail=this.account.email;
    this.invitations.getByEmail(this.invitation).subscribe((x)=> {
      if(x.updated ===  true) {
        this.message='You are in';
      } else {
        this.message='wrong code or no invitation';
      }
      this.code='';
    });
  }

  // this is used to navigate to the user's dashboard - where the registry they just joined, will be
  lead() {
    const url='dashboard/'+this.account.user_id;
    this.router.navigateByUrl(url);
  }
}
