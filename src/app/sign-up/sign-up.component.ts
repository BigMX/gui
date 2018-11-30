import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../class/account';
import { User } from './../class/user.service';
import { Notifs } from '../class/notifs.service';
import { Notif } from '../class/notifications';

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
  private router: Router,
  private users: User,
  private notifs: Notifs
) { }

// important variables initialized
ngOnInit() {
  this.account = {
    lastName: '',
    firstName: '',
    email: '',
    phone: null,
    password: ''
  };
}

// this method is used for email validation
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

  // this method is used to check whether an email is valid or not
  validateEmail(email) {
   // tslint:disable-next-line:max-line-length
   const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
 }

  // this method is used for making a new account - a new user - registration
  signUp() {
   this.users.addUser(this.account).subscribe((account) => {
     this.id = account.user_id;
     this.router.navigate(['login']);
   });
   this.account = {};
 }
}
