import { Component, OnInit } from '@angular/core';
import { Account } from '../class/account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {

alert: string;
account: Account;
constructor() { }

ngOnInit() {
  this.account = {
    lastName: '',
    firstName: '',
    email: '',
    phone: null,
    password: ''
  };
  this.alert = 'Not a valid email';
}

onSearchChange(searchValue: string ) {
  if(validateEmail(searchValue)) {
    this.alert='valid email!!';
  } else {
    this.alert='Not a valid email';
  }
  console.log(validateEmail(searchValue));
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
