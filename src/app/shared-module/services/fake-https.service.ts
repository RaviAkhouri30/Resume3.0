import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import * as rawDb from './../fake-db/fake-db.json';
import { IFakeHttps } from '../interfaces/i-fake-https';

const db: { [key: string]: any } = rawDb;

@Injectable({
  providedIn: 'root'
})
export class FakeHttpsService implements IFakeHttps {

  constructor() { }

  get = <T>(url: string): Observable<ResponseModel<T>> => {
    const data = new ResponseModel<T>(db[url] as T);
    return of(data).pipe(
      switchMap(res => res.data ? of(res) : this.handleError(res) as Observable<ResponseModel<T>>),
      filter(res => !!res),
      map(res => res),
      delay(2000)
    );
  }

  private handleError<T>(result: ResponseModel<T>): Observable<ResponseModel<T>> {
    console.error(result.statusCode + ': ' + result.message);
    return of(result as ResponseModel<T>);
  }
}
