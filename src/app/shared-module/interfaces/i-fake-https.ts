import { Observable } from "rxjs";
import { ResponseModel } from "../models/response-model";
import { Inject } from "@angular/core";

@Inject({
    providedIn: 'root'
})
export abstract class IFakeHttps {
    abstract get<T>(url: string): Observable<ResponseModel<T>>;
}
