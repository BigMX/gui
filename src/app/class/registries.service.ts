import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registry } from './registry';
import { Account } from './account';

@Injectable()
export class Registries {


  protected endPoint = 'http://localhost:3004/registries';
  protected endPointViewers = 'http://localhost:3004/viewersOfRegs';


  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  // this is for adding a new registry
  add(registries: Registry): Observable<Registry> {
    return this.httpClient
      .post<Registry>(`${this.endPoint}`, registries, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  //this is for getting the registries for a certain user
  getRegistries(userId: number): Observable<Registry[]> {
    return this.httpClient
      .get<Registry[]>(`${this.endPoint}/?userId=${userId}&status=active`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }
  // getRegistries(user_id: number): Observable<Registry[]> {
  //   return this.httpClient
  //     .get<Registry[]>(`${this.endPoint}/registry/user_id=${user_id}`, this.httpOptions)
  //     .pipe(catchError(this.handleException));
  // }

  // this is for getting the archived registries for a certain user
  getArchivedRegs(userId: number): Observable<Registry[]> {
    return this.httpClient
      .get<Registry[]>(`${this.endPoint}/?userId=${userId}&status=archived`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // this is for deleting a registry
  deleteReg(regId: number): Observable<Registry> {
    return this.httpClient
    .delete<Registry>(`${this.endPoint}/${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // used to update a registry
  updateReg(reg: Registry): Observable<Registry> {
    return this.httpClient
    .put<Registry>(`${this.endPoint}/${reg.id}`, reg, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // this is for getting a registry
  getRegById(regId: number): Observable<Registry> {
    return this.httpClient
    .get<Registry>(`${this.endPoint}/${regId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}