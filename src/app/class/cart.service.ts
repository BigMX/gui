import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Account } from '../class/account';
import { Token} from '../class/token';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  protected endPoint = 'http://ec2-18-222-252-86.us-east-2.compute.amazonaws.com';
//  protected endPoint = 'http://localhost:3004/users';


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
  // adding an item to the a specific user's cart
  addItemToCart(item: Item): Observable<Item> {
    return this.httpClient
    .post<Item>(`${this.endPoint}/addtocart`, item, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  addItemToRegisty(item: Item): Observable<Item> {
    return this.httpClient
    .put<Item>(`${this.endPoint}/itemregistry`, item, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // retrieving cart items for a specific user
  getItems(user_id: number): Observable<Item[]> {
    return this.httpClient
      .get<Item[]>(`${this.endPoint}/cart/${user_id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getItemsByReg(reg_id: number): Observable<Item[]> {
    return this.httpClient
      .get<Item[]>(`${this.endPoint}/item/${reg_id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  // CONNECTED
  // used for deleting an item from the user's cart
  deleteItem(item_id: number):Observable<Item> {
    return this.httpClient
    .delete<Item>(`${this.endPoint}/deleteitem/${item_id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  claimItem(item_id: number, user_id: number):Observable<Item> {
    return this.httpClient
    .put<Item>(`${this.endPoint}/changeitem/${item_id}/${user_id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getClaimedItem(user_id: number):Observable<Item[]> {
    return this.httpClient
    .get<Item[]>(`${this.endPoint}/getclaimeditem/${user_id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  buyItem(item_id: number):Observable<Item> {
    return this.httpClient
    .put<Item>(`${this.endPoint}/buyitem/${item_id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  getBoughtItem(user_id: number):Observable<Item[]> {
    return this.httpClient
    .get<Item[]>(`${this.endPoint}/getboughtitem/${user_id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
