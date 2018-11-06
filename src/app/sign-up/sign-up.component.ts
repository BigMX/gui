import { Component, OnInit } from '@angular/core';
import { Account } from '../class/account';
import { User } from './../class/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {

alert: string;
account: Account;
id: number;
color: string;
state: number;
constructor(
  private users: User
) { }

ngOnInit() {
  this.account = {
    lastName: '',
    firstName: '',
    email: '',
    phone: null,
    password: ''
  };
}
 onSearchChange(searchValue: string ) {
   if(this.validateEmail(searchValue)) {
      this.alert='valid email!!';
      this.state=3;
    } else {
     this.alert='Not a valid email';
    this.state=2;
   }
   console.log(this.validateEmail(searchValue));
  }

  validateEmail(email) {
   // tslint:disable-next-line:max-line-length
   const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
 }

  signUp() {
   this.users.addUser(this.account).subscribe((account) => {
     this.id = account.id;
   });
   this.account = {};
 }
}
