import { Observable } from "rxjs";
import { ICommand } from "./i-command";
import { UrlConstants } from "../constants/url-constants";

export interface IBaseService {
    attachViewDataHandler<T>(url: UrlConstants): Observable<T>;
    attachViewApiHandler<T>(url: UrlConstants): Observable<T>;
    attachCommandApiHandler<T>(): Observable<ICommand<T>>;
}
