import { Observable } from "rxjs";

export interface IViewModel<T> {
    data: T;
    inIt: () => Observable<void>;
    attachViewHandler: () => Observable<void>;
    attachCommandHandler: () => Observable<void>;
}
