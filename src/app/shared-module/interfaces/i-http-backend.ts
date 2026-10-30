import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Read-only contract used by the app to abstract backend persistence calls.
 *
 * The resume app can swap between mock data, Firebase Firestore, or any other
 * backend implementation without changing the feature services that consume it.
 * The portfolio never writes from the browser, so the contract only exposes reads
 * (Interface Segregation) and Firestore rules deny all client writes.
 *
 * Implementations must never throw synchronously: failures are reported as an
 * `HttpResponse` with a non-2xx status so every adapter is substitutable (LSP).
 */
export abstract class IHttpBackend {
    /** Fetches a single resource from the configured backend. */
    abstract get<T>(url: string): Observable<HttpResponse<T>>;
}
