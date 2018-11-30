import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registry } from './registry';
import { Account } from './account';
import { Invitation } from './invitation';
import { Update } from '../class/update';

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
  // this is used for generating an invitation for another user
  add(invitation:Invitation): Observable<Invitation> {
    return this.httpClient
      .post<Invitation>(`${this.endPoint}/addinvitation`, invitation, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for retrieving an invitation, once a user goes to the join page
  getByEmail(invitation: Invitation): Observable<Update> {
    return this.httpClient
    .put<Update>(`${this.endPoint}/acceptinvitation`,invitation, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for retrieving all of the registries that a user has been invited to
  getAll(invitation: Invitation): Observable<Registry[]> {
    return this.httpClient
    .put<Registry[]>(`${this.endPoint}/getinvitation`,invitation, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for changing an invitation's status - which determines whether an invitation has been accepted
  update(invitation:Invitation): Observable<Invitation> {
    return this.httpClient
      .put<Invitation>(`${this.endPoint}/${invitation.id}`, invitation, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // this is used for deleting an invitation
  deleteByEmail(invitation: Invitation): Observable<Invitation> {
    return this.httpClient
    .put<Invitation>(`${this.endPoint}/deleteinvitation`, invitation,this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
