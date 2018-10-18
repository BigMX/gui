import { Component, OnInit } from '@angular/core';
import { Account } from '../class/account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  account: Account;
  constructor() { }

  ngOnInit() {
    this.account = {
      lastName : '',
      firstName : '',
      email: '',
      phone: null,
      password: ''
    };
  }

}
