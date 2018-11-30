import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Account } from '../class/account';
import { Token} from '../class/token';

@Injectable()
export class User {

  protected endPoint = 'http://ec2-18-222-252-86.us-east-2.compute.amazonaws.com';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
     // tslint:disable-next-line:max-line-length
     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJlbWFpbCI6bnVsbH0.ZQBWd-2ksow_Ty-9dfwQfyeR8fMtAB_leFBibGMW0aM'
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  // CONNECTED
  // this is for adding a user
  addUser(account: Account): Observable<Account> {
    return this.httpClient
      .post<Account>(`${this.endPoint}/signup`, account, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for getting a specific user by id
  getById(user_id: number): Observable<Account> {
    return this.httpClient
      .get<Account>(`${this.endPoint}/user/${user_id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is for searching for a user by last name
  getByName(lastName: string): Observable<Account[]> {
    return this.httpClient
      .get<Account[]>(`${this.endPoint}/users/${lastName}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for logging in with the appropriate credentials
  getLogin(user:Account): Observable<Token> {
    return this.httpClient
    .post<Token>(`${this.endPoint}/login`,user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for updating a user's password
  updatePassword(user: Account): Observable<Account> {
    const obj = { user: user};
    return this.httpClient
    .put<Account>(`${this.endPoint}/changepassword/${user.user_id}`, user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used to get a list of 'viewers' - which is a list of the invited users for a specififc registry
  // which will be displayed in a registry page
  getViewer(regId: number): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.endPoint}/getusers/${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
