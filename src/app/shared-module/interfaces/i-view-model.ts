import { Observable } from "rxjs";

export interface IViewModel {
    data: any;
    inIt: () => Observable<void>;
    attachViewHandler: () => Observable<void>;
    attachCommandHandler: () => Observable<void>;
}
