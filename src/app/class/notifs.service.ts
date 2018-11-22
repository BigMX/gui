import { Notif } from './notifications';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Notifs {

  protected endPoint = 'http://ec2-18-222-252-86.us-east-2.compute.amazonaws.com';
  // protected endPoint = 'http://localhost:3004/notifications';

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

  // this is for removing a notification when the user clicks on the x
  removeNotif(id: number): Observable<Notif> {
    return this.httpClient
    .delete<Notif>(`${this.endPoint}/deletenotification/${id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for adding a notification to the notifications page
  addNotifs(notif: Notif): Observable<Notif> {
    return this.httpClient
    .post<Notif>(`${this.endPoint}/addNotifications`, notif, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is used to get the notifications for a certain user
  getNotifs(id: number): Observable<Notif[]> {
    return this.httpClient
    .get<Notif[]>(`${this.endPoint}/notifications/${id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
