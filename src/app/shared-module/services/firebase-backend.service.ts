import { HttpResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { IHttpBackend } from '../interfaces/i-http-backend';
import { addDoc, collection, doc, Firestore, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDatabaseService } from './firebase-database.service';

/**
 * Firestore-backed implementation of the application HTTP contract.
 *
 * This adapter translates the app's abstract backend operations to Firestore
 * document reads and writes so feature services stay unaware of the storage layer.
 */
@Service()
export class FirebaseBackendService implements IHttpBackend {
    private readonly db: Firestore;
    private readonly fd: FirebaseDatabaseService = inject(FirebaseDatabaseService);

    constructor() {
        // Resolve the shared Firestore instance from the Firebase bootstrap service.
        this.db = this.fd.fireStore;
    }

    /**
     * Parses a URL into a Firestore collection path and document ID.
     *
     * Example: /resumes/123 -> collectionPath = 'resumes', docId = '123'
     */
    private parseUrl(url: string): { collectionPath: string; docId: string } {
        // 1. Defensively strip leading/trailing slashes and filter empty items.
        const splitUrl = url.split('/').filter(segment => segment.trim() !== '');

        // 2. Fall back to safe defaults so the code never creates undefined IDs or paths.
        const docId = splitUrl[splitUrl.length - 1] || 'default-id';
        const collectionPath = splitUrl[splitUrl.length - 2] || 'resumes';

        return { collectionPath, docId };
    }

    /** Reads a document from Firestore and wraps the result in Angular's HttpResponse shape. */
    get<T>(url: string): Observable<HttpResponse<T>> {
        const { collectionPath, docId } = this.parseUrl(url);
        const docRef = doc(this.db, collectionPath, docId);

        return from(getDoc(docRef)).pipe(
            map(snapshot => new HttpResponse<T>({
                status: snapshot.exists() ? 200 : 404,
                statusText: snapshot.exists() ? 'Success' : 'Not Found',
                body: snapshot.data() as T
            })),
            catchError(err => this.handleError<T>(err))
        );
    }

    /** Creates a new document with a generated Firebase ID and returns it as a response payload. */
    post<T>(url: string, body: any): Observable<HttpResponse<T>> {
        // The requested endpoint is treated as the collection name when the URL ends with a collection.
        const splitUrl = url.split('/').filter(segment => segment.trim() !== '');
        const targetCollection = splitUrl[splitUrl.length - 1] || 'resumes';
        const colRef = collection(this.db, targetCollection);

        return from(addDoc(colRef, body)).pipe(
            map(docRef => new HttpResponse<T>({
                status: 201,
                statusText: 'Created successfully',
                body: { id: docRef.id, ...body } as T
            })),
            catchError(err => this.handleError<T>(err))
        );
    }

    /** Replaces an entire Firestore document with the supplied payload. */
    put<T>(url: string, body: any): Observable<HttpResponse<T>> {
        const { collectionPath, docId } = this.parseUrl(url);
        const docRef = doc(this.db, collectionPath, docId);

        // setDoc replaces the target document, removing any keys not explicitly present.
        return from(setDoc(docRef, body)).pipe(
            map(() => new HttpResponse<T>({
                status: 200,
                statusText: 'Replaced successfully',
                body: body as T
            })),
            catchError(err => this.handleError<T>(err))
        );
    }

    /** Updates only the fields supplied in the request payload while preserving the rest of the document. */
    patch<T>(url: string, body: any): Observable<HttpResponse<T>> {
        const { collectionPath, docId } = this.parseUrl(url);
        const docRef = doc(this.db, collectionPath, docId);

        // updateDoc only mutates the provided keys, which is safer for partial content updates.
        return from(updateDoc(docRef, body)).pipe(
            map(() => new HttpResponse<T>({
                status: 200,
                statusText: 'Updated changes successfully',
                body: body as T
            })),
            catchError(err => this.handleError<T>(err))
        );
    }

    /** Converts Firebase exceptions to the same HttpResponse contract used by the rest of the app. */
    private handleError<T>(err: any): Observable<HttpResponse<T>> {
        return of(new HttpResponse<T>({
            status: 500,
            statusText: err.message || 'Firebase internal operation failure',
            body: {} as T
        }));
    }
}
