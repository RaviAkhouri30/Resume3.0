import { HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, defer, map, Observable, of } from 'rxjs';
import { doc, getDoc } from 'firebase/firestore/lite';
import { IHttpBackend } from '../interfaces/i-http-backend';
import { FirebaseDatabaseService } from './firebase-database.service';

/**
 * Firestore-backed implementation of the application backend contract.
 *
 * This adapter translates the app's abstract read operation to a Firestore
 * document read so feature services stay unaware of the storage layer.
 */
@Injectable()
export class FirebaseBackendService implements IHttpBackend {
    private readonly database: FirebaseDatabaseService = inject(FirebaseDatabaseService);

    /** Reads a document from Firestore and wraps the result in Angular's HttpResponse shape. */
    get<T>(url: string): Observable<HttpResponse<T>> {
        // `defer` keeps URL validation and the read lazy, and routes any synchronous
        // failure into the observable error channel instead of throwing at the caller.
        return defer(() => {
            const [rootCollection, ...remainingSegments] = this.parseUrl(url);
            return getDoc(doc(this.database.fireStore, rootCollection, ...remainingSegments));
        }).pipe(
            map(snapshot => snapshot.exists()
                ? new HttpResponse<T>({ status: 200, statusText: 'OK', body: this.unwrapSectionData(snapshot.data()) as T, url })
                : new HttpResponse<T>({ status: 404, statusText: 'Not Found', url })),
            catchError((err: unknown) => of(this.toErrorResponse<T>(err, url)))
        );
    }

    /**
     * Converts an endpoint into the document path used by Firestore.
     *
     * The application endpoint is intentionally aligned with the database hierarchy:
     * `resumes/{userId}/resume/{section}`. Keeping the complete path is important because
     * the user document scopes every resume section to its owner.
     */
    private parseUrl(url: string): [string, ...string[]] {
        const segments = url.replace(/^https?:\/\//i, '').split('/').filter(segment => segment.trim() !== '');

        if (segments.length !== 4 || segments[0] !== 'resumes' || segments[2] !== 'resume') {
            throw new Error(`Invalid resume URL: ${url}. Expected resumes/{userId}/resume/{section}.`);
        }

        return segments as [string, ...string[]];
    }

    /**
     * Converts the Firestore document envelope back to the feature payload shape.
     * Object sections stay as-is; array sections are stored under `items`.
     */
    private unwrapSectionData(data: Record<string, unknown>): unknown {
        return Array.isArray(data['items']) ? data['items'] : data;
    }

    /** Converts Firebase exceptions to the same HttpResponse contract used by the rest of the app. */
    private toErrorResponse<T>(err: unknown, url: string): HttpResponse<T> {
        const error = err as { code?: string; message?: string } | undefined;
        const statusText = error?.code ? `${error.code}: ${error.message}` : error?.message ?? 'Firebase read failed';
        const status = error?.code === 'permission-denied' ? 403 : 500;

        return new HttpResponse<T>({ status, statusText, url });
    }
}
