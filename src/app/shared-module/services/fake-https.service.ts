import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as rawDb from './../fake-db/fake-db.json';
import { IFakeHttps } from '../interfaces/i-fake-https';
import { HttpResponse } from '@angular/common/http';

const db: { [key: string]: any } = rawDb;

/**
 * @fileoverview This file contains the implementation of the FakeHttpsService class,
 * which simulates HTTP GET requests and responses for testing purposes.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * FakeHttpsService is a mock service that simulates HTTP GET requests.
 * It implements the IFakeHttps interface.
 */
export class FakeHttpsService implements IFakeHttps {

  /**
   * Constructs a new instance of FakeHttpsService.
   */
  constructor() { }

  /**
   * Simulates an HTTP GET request to the specified URL.
   * 
   * @template T - The type of the response body.
   * @param {string} url - The URL to send the GET request to.
   * @returns {Observable<HttpResponse<T>>} - An observable that emits the simulated HTTP response.
   */
  get = <T>(url: string): Observable<HttpResponse<T>> => {
    const data = this.getResponse<T>(url);

    return of(data).pipe(delay(2000));
  }

  /**
   * Generates a simulated HTTP response for the specified URL.
   * 
   * @template T - The type of the response body.
   * @param {string} url - The URL to generate the response for.
   * @returns {HttpResponse<T>} - The simulated HTTP response.
   * @private
   */
  private getResponse = <T>(url: string): HttpResponse<T> => {
    let res: T;
    let statusText: string;
    let status: number;

    if (!db[url]) {
      res = {} as T;
      statusText = 'data not found';
      status = 404;
    } else {
      res = db[url];
      statusText = 'data fetched successfully';
      status = 200;
    }

    return new HttpResponse<T>({ status: status, body: res, statusText: statusText });
  }

}
