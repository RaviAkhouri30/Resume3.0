import { HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, defer, EMPTY, finalize, map, Observable, throwError, timeout } from "rxjs";
import { LoaderService } from "../services/loader-service";
import { NotificationService } from "../services/notification.service";

/** Maximum time a single backend request may take before it is abandoned. */
export const REQUEST_TIMEOUT_MS = 15000;

/** Error raised for a non-2xx backend response; keeps the status for reporting. */
export class HttpStatusError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message || `Request failed with status ${status}`);
        this.name = 'HttpStatusError';
    }
}

/** Error raised when a request exceeds `REQUEST_TIMEOUT_MS`. */
export class RequestTimeoutError extends HttpStatusError {
    constructor() {
        super(408, 'Request timeout');
        this.name = 'RequestTimeoutError';
    }
}

/**
 * Wraps backend requests with loading state, timeout and error reporting.
 *
 * - The loader is shown when the request is *subscribed* (not after the first
 *   emission) and is always released in `finalize`, so concurrent requests are safe.
 * - Each request gets its own timeout; there is no shared, mutable timer.
 * - Every failure (non-2xx status, timeout, thrown error) is reported once and
 *   the stream completes without a value, so views keep their empty state.
 */
@Injectable({ providedIn: 'root' })
export class HttpsErrorHandler {
    private readonly loaderService: LoaderService = inject(LoaderService);
    private readonly notificationService: NotificationService = inject(NotificationService);

    /** Unwraps a successful response body, or reports the failure and completes. */
    handleHttpsError<T>(request$: Observable<HttpResponse<T>>): Observable<T> {
        return defer(() => {
            this.loaderService.show();

            return request$.pipe(
                timeout({ first: REQUEST_TIMEOUT_MS, with: () => throwError(() => new RequestTimeoutError()) }),
                map(response => this.unwrapBody(response)),
                catchError((err: unknown) => this.report(err)),
                finalize(() => this.loaderService.hide())
            );
        });
    }

    private unwrapBody<T>(response: HttpResponse<T>): T {
        if (!response.ok || response.body === null) {
            throw new HttpStatusError(response.status, response.statusText);
        }
        return response.body;
    }

    private report(err: unknown): Observable<never> {
        const status = err instanceof HttpStatusError ? err.status : 0;
        const message = err instanceof Error ? err.message : String(err);
        this.notificationService.showError(status, message);
        return EMPTY;
    }
}
