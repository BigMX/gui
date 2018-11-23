import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Account } from '../class/account';
import { Token} from '../class/token';

@Injectable()
export class User {

 // protected endPoint = 'http://ec2-18-222-252-86.us-east-2.compute.amazonaws.com';
  protected endPoint = 'http://localhost:3004/users';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  // this is for adding a user
  addUser(account: Account): Observable<Account> {
    return this.httpClient
      .post<Account>(`${this.endPoint}/signup`, account, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // this is for getting a user based on id
  getById(id: number): Observable<Account> {
    return this.httpClient
      .get<Account>(`${this.endPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // getById(user_id: number): Observable<Account> {
  //   return this.httpClient
  //     .get<Account>(`${this.endPoint}/user/${user_id}`, this.httpOptions)
  //     .pipe(catchError(this.handleException));
  // }

  getByName(lastName: string): Observable<Account[]> {
    return this.httpClient
      .get<Account[]>(`${this.endPoint}/?lastName=${lastName}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // this is for logging in since we don't know how to authorize and do security
  // getLogin(email: string, password: string): Observable<Account> {
  //   return this.httpClient
  //   .get<Account>(`${this.endPoint}/?email=${email}&password=${password}`, this.httpOptions)
  //   .pipe(catchError(this.handleException));
  // }

  getLogin(user:Account): Observable<Token> {
    return this.httpClient
    .post<Token>(`${this.endPoint}/login`,user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for removing a notification when the user clicks on the x
  removeNotif(user: Account): Observable<Account> {
    return this.httpClient
    .put<Account>(`${this.endPoint}/${user.id}`, user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  updatePassword(user: Account): Observable<Account> {
    return this.httpClient
    .put<Account>(`${this.endPoint}/${user.id}`, user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for adding a notification to the notifications page
  addNotif(user: Account): Observable<Account> {
    return this.httpClient
    .put<Account>(`${this.endPoint}/${user.id}`, user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for adding an item to the user's cart
  addItemToCart(user: Account): Observable<Account> {
    return this.httpClient
    .put<Account>(`${this.endPoint}/${user.id}`, user, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
