import { Observable } from "rxjs";
import { Inject } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

@Inject({
    providedIn: 'root'
})
export abstract class IFakeHttps {
    abstract get<T>(url: string): Observable<HttpResponse<T>>;
}
