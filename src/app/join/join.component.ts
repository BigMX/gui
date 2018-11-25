import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import {Invitations} from './../class/invitation.service';
import { Invitation } from '../class/invitation';
import {Account} from '../class/account';
import { User } from '../class/user.service';
import { Viewer } from '../class/viewers';

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

  ngOnInit() {
    this.in=true;
    this.viewer=new Viewer;
    this.route.params.subscribe((params: JoinParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          console.log(acct);
          this.account = acct[0];
        });
      }
    });
  }

  join() {
    this.invitation=new Invitation;
    this.invitation.Code=this.code;
    this.invitation.receiverEmail=this.account.email;
    this.invitations.getByEmail(this.invitation).subscribe((x)=> {
      console.log(x);
      if(x){
        this.message='You are in';
      }else{
        this.message='wrong code or no invitation';
      }
      this.code='';
      // if(x[0]===undefined) {
      //   this.message='wrong code or no invitation';
      // } else {
      //   this.message='You are in';
      //   this.in=false;
      //   // this.registries.getRegById(x[0].registryId).subscribe((reg) => {
      //   //   this.currentReg = reg;
      //   //   if (this.currentReg.viewers === undefined) {
      //   //     this.currentReg.viewers = [];
      //   //   }
      //   //   this.viewer.viewerEmail = this.account.email;
      //   //   this.viewer.viewerId = this.account.id;
      //   //   this.currentReg.viewers.push(this.viewer);
      //   //   this.registries.updateReg(this.currentReg).subscribe((re) => {
      //   //   });
      //   // });
      // }
      // x[0].status=true;
      // this.invitations.update(x[0]).subscribe((y)=> {

      // });
      // this.code='';
    });
  }

  lead() {
    const url='dashboard/'+this.account.user_id;
    this.router.navigateByUrl(url);
  }
}
