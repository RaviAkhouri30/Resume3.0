import { Observable } from "rxjs";
import { UrlConstants } from "../constants/url-constants";

export interface IApiBaseService {
    attachViewDataHandler<T>(url: UrlConstants): Observable<T>;
    attachViewApiHandler<T>(url: UrlConstants): Observable<T>;
}
