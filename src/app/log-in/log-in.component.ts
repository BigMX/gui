/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../class/account';
import { User } from './../class/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email: string;
  password: string;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private users: User
  ) { }

  // important variables initialized
  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  // this method is used for logging in and alerts the user if the wrong password is typed
  login() {
    let acc = new Account;
    acc.email=this.email;
    acc.password=this.password;
    // this.users.getLogin(this.email, this.password).subscribe((account) => {
    //   console.log(account);
    //   if(account !== undefined && account[0]===undefined) {
    //     alert('wrong password!');
    //   } else if (account[0].firstName !== undefined) {
    //     const userid = +account[0].id;
    //     console.log(userid);
    //     this.router.navigate(['dashboard', userid]);
    //   } else {
    //     alert('wrong password');
    //   }
    // });
    this.users.getLogin(acc).subscribe((Userid) => {
      console.log(Userid);
      // if(account !== undefined && account[0]===undefined) {
      //   alert('wrong password!');
      // } else if (account[0].firstName !== undefined) {
      //   const userid = +account[0].id;
      //   console.log(userid);
      this.router.navigate(['dashboard', Userid.user_id]);
      // } else {
      //   alert('wrong password');
      // }
    });
  }
}
