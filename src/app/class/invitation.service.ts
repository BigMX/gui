import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registry } from './registry';
import { Account } from './account';
import { Invitation } from './invitation';

@Injectable()
export class Invitations {

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
  add(invitation:Invitation): Observable<Invitation> {
    return this.httpClient
      .post<Invitation>(`${this.endPoint}/addinvitation`, invitation, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getByEmail(email: string, Code:string): Observable<Invitation> {
    const obj = {
      email: email,
      Code: Code
    };
    return this.httpClient
    .post<Invitation>(`${this.endPoint}/invitation/${Code}`, obj, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getAll(email: string): Observable<Invitation[]> {
    return this.httpClient
    .get<Invitation[]>(`${this.endPoint}/?receiverEmail=${email}&status=true`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  update(invitation:Invitation): Observable<Invitation> {
    return this.httpClient
      .put<Invitation>(`${this.endPoint}/${invitation.id}`, invitation, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
