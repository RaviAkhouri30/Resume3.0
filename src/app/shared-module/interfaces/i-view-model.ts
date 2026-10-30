import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export interface IViewModel<T> {
    /** View state exposed to the template. */
    readonly data: Signal<T>;
    /** Starts loading data and handling commands; the view owns the subscription. */
    init(): Observable<void>;
}
