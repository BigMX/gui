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
    const acc = new Account;
    acc.email=this.email;
    acc.password=this.password;
    this.users.getLogin(acc).subscribe((Userid) => {
      this.router.navigate(['dashboard', Userid.user_id]);
    });
  }
}
