import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registry } from './registry';
import { Account } from './account';

@Injectable()
export class Registries {

  protected endPoint = 'http://localhost:3004/registries';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  add(registries: Registry, userId:number): Observable<Registry> {
    return this.httpClient
      .post<Registry>(`${this.endPoint}/${userId}`, registries, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getRegistries(userId: number): Observable<Registry[]> {
    return this.httpClient
      .get<Registry[]>(`${this.endPoint}/?userId=${userId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
