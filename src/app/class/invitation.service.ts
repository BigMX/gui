import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registry } from './registry';
import { Account } from './account';
import { Invitation } from './invitation';

@Injectable()
export class Invitations {

  protected endPoint = 'http://localhost:3004/invitation';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  add(invitation:Invitation): Observable<Invitation> {
    return this.httpClient
      .post<Invitation>(`${this.endPoint}`, invitation, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getByEmail(email: string, Code:string): Observable<Invitation> {
    return this.httpClient
    .get<Invitation>(`${this.endPoint}/?receiverEmail=${email}&Code=${Code}`, this.httpOptions)
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

  deleteByEmailAndReg(email: string, regId: number): Observable<Invitation> {
    return this.httpClient
    .delete<Invitation>(`${this.endPoint}/?receiverEmail=${email}&status=true/?registryId=${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
