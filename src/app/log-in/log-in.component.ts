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

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    this.users.getLogin(this.email, this.password).subscribe((account) => {
      if (account[0].firstName !== undefined) {
        var userid = +account[0].id;
        this.router.navigate(['dashboard/{{userid}}']);
      }
    });
  }
}
