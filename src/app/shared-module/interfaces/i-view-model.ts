import { Observable } from "rxjs";

export interface IViewModel<T> {
    data: T;
    inIt: () => Observable<void>;
}
