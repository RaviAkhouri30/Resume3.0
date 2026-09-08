import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as rawDb from './../fake-db/fake-db.json';
import { HttpResponse } from '@angular/common/http';
import { IHttpBackend } from '../interfaces/i-http-backend';

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
 * It implements the IHttpBackend abstract class.
 */
export class FakeHttpsService implements IHttpBackend {

  /**₹
   * Constructs a new instance of FakeHttpsService.
   */
  constructor() { }
  post<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  put<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  patch<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  /**
   * Simulates an HTTP GET request to the specified URL.
   * 
   * @template T - The type of the response body.
   * @param {string} url - The URL to send the GET request to.
   * @returns {Observable<HttpResponse<T>>} - An observable that emits the simulated HTTP response.
   */
  get = <T>(url: string): Observable<HttpResponse<T>> => {
    const data = this.getResponse<T>(url);

    return of(data).pipe(delay(500));
  }

  /**
   * Generates a simulated HTTP response for the specified URL.
   * 
   * @template T - The type of the response body.
   * @param {string} url - The URL to generate the response for.
   * @returns {HttpResponse<T>} - The simulated HTTP response.
   * @private
   */
  private getResponse = <T>(_url: string): HttpResponse<T> => {
    let res: T;
    let statusText: string;
    let status: number;
    let SplitUrl = _url.split('/');
    let url = SplitUrl[SplitUrl.length - 1] as string;

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
