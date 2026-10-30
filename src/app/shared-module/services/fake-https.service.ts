import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as rawDb from './../fake-db/fake-db.json';
import { HttpResponse } from '@angular/common/http';
import { IHttpBackend } from '../interfaces/i-http-backend';

/**
 * Local JSON-backed mock backend used for development and demo scenarios.
 *
 * It mirrors the `IHttpBackend` contract so the rest of the app can run without a
 * live server while still using the same response shape as the real storage layer.
 * The JSON keys mirror the Firestore path `resumes/{userId}/resume/{section}`.
 */
const db: Record<string, unknown> = rawDb;

/** Simulated network latency so loading states are exercised during development. */
const FAKE_LATENCY_MS = 300;

@Injectable()
export class FakeHttpsService implements IHttpBackend {

  /** Simulates a GET request by resolving every URL segment against the fake database. */
  get<T>(url: string): Observable<HttpResponse<T>> {
    return of(this.getResponse<T>(url)).pipe(delay(FAKE_LATENCY_MS));
  }

  /**
   * Resolving the complete path prevents two users or resumes from accidentally
   * sharing a section with the same name.
   */
  private getResponse<T>(url: string): HttpResponse<T> {
    const segments = url.replace(/^https?:\/\//i, '').split('/').filter(segment => segment.trim() !== '');
    const data = segments.reduce<unknown>(
      (current, segment) => (current as Record<string, unknown> | undefined)?.[segment],
      db
    );

    if (data === undefined) {
      return new HttpResponse<T>({ status: 404, statusText: 'Not Found', url });
    }

    return new HttpResponse<T>({ status: 200, statusText: 'OK', body: data as T, url });
  }
}
