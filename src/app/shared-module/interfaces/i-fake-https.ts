import { Observable } from "rxjs";
import { Inject } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

/**
 * @deprecated This interface is deprecated and will be removed in future versions. Use IHttpBackend instead.
 */
@Inject({
    providedIn: 'root'
})
export abstract class IFakeHttps {
    abstract get<T>(url: string): Observable<HttpResponse<T>>;
}
