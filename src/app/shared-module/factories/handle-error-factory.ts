import { HttpResponse } from "@angular/common/http";
import { catchError, EMPTY, filter, map, Observable, startWith, Subscriber, takeUntil, tap, timeout } from "rxjs";
import { LoaderService } from "../services/loader-service";
import { Injectable, Injector } from "@angular/core";
import { NotificationService } from "../services/notification.service";

/**
 * Factory class to handle HTTP errors for HTTP requests.
 * 
 * This class provides methods to handle HTTP errors, show and hide loaders during requests,
 * and catch and handle different types of errors including timeout errors.
 * 
 * @class HanldeErrorFactory
 * 
 * @property {Subscriber<any>} _cancelRequest - Subscriber to handle request cancellation.
 * @property {LoaderService} _loaderService - Service to manage the display of loaders.
 * @property {NotificationService} _notificationService - Service to manage notifications.
 * 
 * @constructor
 * @param {Injector} injector - Injector to get instances of LoaderService and NotificationService.
 * 
 * @method handleHttpsError
 * Handles HTTP errors for the given HTTP request callback.
 * Shows a loader while the request is in progress, and hides it when the request completes.
 * Throws an error if the response status code is not valid.
 * Catches and handles different types of errors, including timeout errors.
 * 
 * @template T - The type of the HTTP response.
 * @param {Observable<T>} httpsReqCallBack - The HTTP request callback to handle errors for.
 * @returns {Observable<T>} An observable that emits the HTTP response or an empty observable in case of an error.
 * 
 * @method cancelRequest
 * Creates an observable to handle request cancellation.
 * 
 * @returns {Observable<any>} An observable that emits a value when the request is cancelled.
 * 
 * @method throwError
 * Throws an error if the status code is not valid.
 * 
 * @template T - The type of the HTTP response.
 * @param {HttpResponse<T>} result - The HTTP response to check.
 * @throws {Error} If the status code is not valid.
 * 
 * @method catchAndHandleError
 * Catches and handles different types of errors.
 * 
 * @param {any} err - The error to handle.
 * @returns {Observable<any>} An empty observable.
 */

@Injectable({
    providedIn: 'root'
})
export class HandleErrorFactory {
    private _cancelRequest!: Subscriber<any>;
    private _loaderService: LoaderService;
    private _notificationService: NotificationService;

    constructor(protected injector: Injector) {
        this._loaderService = injector.get(LoaderService);
        this._notificationService = injector.get(NotificationService);
    }
    /**
     * Handles HTTP errors for the given HTTP request callback.
     * Shows a loader while the request is in progress, and hides it when the request completes.
     * Throws an error if the response status code is not valid.
     * Catches and handles different types of errors, including timeout errors.
     * 
     * @template T - The type of the HTTP response.
     * @param httpsReqCallBack - The HTTP request callback to handle errors for.
     * @returns An observable that emits the HTTP response or an empty observable in case of an error.
     */
    handleHttpsError = <T>(httpsReqCallBack: Observable<T>): Observable<T> => {
        return httpsReqCallBack.pipe(
            tap(() => this._loaderService.show()),
            takeUntil(this.cancelRequest()),
            filter(result => result instanceof HttpResponse),
            map(res => res as HttpResponse<T>),
            tap(() => this._loaderService.hide()),
            tap(res => this.throwError<T>(res)),
            timeout({
                first: 60000, each: 10000, with: () => {
                    throw new CustomTimeoutError();
                }
            }),
            catchError((err) => this.catchAndHandleError(err))
        );
    }

    /**
     * @description Creates an observable to handle request cancellation.
     * @returns Observable<any>
     */
    cancelRequest = (): Observable<any> => {
        return new Observable(res => {
            this._cancelRequest = res;
            setTimeout(() => {
                res.next('');
                // timeout after 1 second
            }, 60000);
        })
    }

    /**
     * Throws an error if the status code is not valid.
     * @param result - The HTTP response to check.
     * @throws Error if the status code is not valid.
     */
    private throwError = <T>(result: HttpResponse<T>): void => {
        if (!VALID_STATUS_CODES.includes(result.status)) {
            throw new Error(result.statusText);
        }
        this._cancelRequest.unsubscribe();
    }

    /**
     * Catches and handles different types of errors.
     * @param err - The error to handle.
     * @returns An empty observable.
     */
    private catchAndHandleError = (err: any): Observable<any> => {
        if (err instanceof HttpResponse) {
            this._notificationService.showError(err.status, err.statusText);
        } else if (err instanceof CustomTimeoutError) {
            this._notificationService.showError(err.status, err.message);
        }

        // Hide loader if it is currently loading
        if (this._loaderService.isLoading) {
            this._loaderService.hide();
        }

        // Return an empty observable
        return EMPTY.pipe(startWith(undefined))
    }

}

/**
 * @description Custom error class for timeout
 */
class CustomTimeoutError extends Error {
    private _status: number = 408;

    constructor() {
        super('Request timeout');
        this.name = 'CustomTimeoutError';
    }

    get status(): number {
        return this._status;
    }
}

// Valid server response status codes
const VALID_STATUS_CODES: number[] = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];