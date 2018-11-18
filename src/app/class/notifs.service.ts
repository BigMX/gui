import { Notif } from './notifications';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Notifs {

  protected endPoint = 'http://localhost:3004/notifications';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  // this is for removing a notification when the user clicks on the x
  removeNotif(id: number, notif: Notif): Observable<Notif> {
    return this.httpClient
    .put<Notif>(`${this.endPoint}/${id}`, notif, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for adding a notification to the notifications page
  addNotif(id: number, notif: Notif): Observable<Notif> {
    return this.httpClient
    .put<Notif>(`${this.endPoint}/${id}`, notif, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getNotifs(id: number): Observable<Notif> {
    console.log(id);
    return this.httpClient
    .get<Notif>(`${this.endPoint}/?userId=${id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  newUser(notif: Notif): Observable<Notif> {
    return this.httpClient
      .post<Notif>(this.endPoint, notif, this.httpOptions)
      .pipe(catchError(this.handleException));
  }
  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
