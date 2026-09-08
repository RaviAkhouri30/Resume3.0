import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Shared contract used by the app to abstract backend persistence calls.
 *
 * The resume app can swap between mock data, Firebase Firestore, or any other
 * backend implementation without changing the feature services that consume it.
 */
export abstract class IHttpBackend {
    /** Fetches a single resource from the configured backend. */
    abstract get<T>(url: string): Observable<HttpResponse<T>>;

    /** Creates a new resource and returns the created payload with metadata. */
    abstract post<T>(url: string, body: any): Observable<HttpResponse<T>>;

    /** Replaces an entire resource at the target URL. */
    abstract put<T>(url: string, body: any): Observable<HttpResponse<T>>;

    /** Applies a partial update to an existing resource. */
    abstract patch<T>(url: string, body: any): Observable<HttpResponse<T>>;
}
