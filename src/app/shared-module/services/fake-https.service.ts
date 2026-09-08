import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as rawDb from './../fake-db/fake-db.json';
import { HttpResponse } from '@angular/common/http';
import { IHttpBackend } from '../interfaces/i-http-backend';

/**
 * Local JSON-backed mock backend used for development and demo scenarios.
 *
 * It intentionally mirrors the `IHttpBackend` contract so the rest of the app can
 * run without a live server while still using the same response shape as the real
 * storage layers. The JSON keys mirror the Firestore path
 * `resumes/{userId}/resume/{section}`.
 */
const db: { [key: string]: any } = rawDb;

@Injectable({
  providedIn: 'root'
})
export class FakeHttpsService implements IHttpBackend {

  /**
   * Creates the mock backend instance used by the environment provider selection.
   */
  constructor() { }

  /**
   * Placeholder for create operations.
   *
   * The current demo implementation keeps data read-only and intentionally avoids
   * mutating the local JSON dataset.
   */
  post<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  /**
   * Placeholder for full-document replacement operations.
   */
  put<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  /**
   * Placeholder for partial update operations.
   */
  patch<T>(_url: string, _body: any): Observable<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  /**
   * Simulates a GET request using the local fake database.
   *
   * @template T The type of the payload returned in the response body.
   * @param url The endpoint key to read from the mock database.
   * @returns An observable stream that emits the synthetic HttpResponse.
   */
  get = <T>(url: string): Observable<HttpResponse<T>> => {
    const data = this.getResponse<T>(url);
    return of(data).pipe(delay(500));
  };

  /**
   * Utility placeholder for future auth checks in the mock backend.
   */
  isAuthenticated(): boolean {
    // A mock token check can be enabled here if the app needs a local auth simulation.
    throw new Error('Method not implemented.');
  }

  /**
  * Resolves every endpoint segment against the nested fake database.
  *
  * Resolving the complete path prevents two users or resumes from accidentally
  * sharing a section with the same name.
   *
   * @template T The type of the response body.
   * @param _url The endpoint to look up in the mock data set.
   * @returns A synthetic HttpResponse with either the requested data or a 404 result.
   */
  private getResponse = <T>(_url: string): HttpResponse<T> => {
    const segments = _url.replace(/^https?:\/\//i, '').split('/').filter(segment => segment.trim() !== '');
    const data = segments.reduce((current, segment) => current?.[segment], db);

    if (data === undefined) {
      return new HttpResponse<T>({
        status: 404,
        statusText: 'data not found',
        body: {} as T
      });
    }

    return new HttpResponse<T>({
      status: 200,
      statusText: 'data fetched successfully',
      body: data as T
    });
  };
}
