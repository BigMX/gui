import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Account } from '../class/account';

@Injectable()
export class User {

  // protected endPoint = 'ec2-18-225-35-42.us-east-2.compute.amazonaws.com:8888';
  protected endPoint = 'http://localhost:3004/users';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  addUser(account: Account): Observable<Account> {
    return this.httpClient
      .post<Account>(this.endPoint, account, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getById(id: number): Observable<Account> {
    return this.httpClient
      .get<Account>(`${this.endPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getLogin(email: string, password: string): Observable<Account> {
    return this.httpClient
    .get<Account>(`${this.endPoint}/?email=${email}&password=${password}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  removeNotif(user: Account): Observable<Account> {
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
