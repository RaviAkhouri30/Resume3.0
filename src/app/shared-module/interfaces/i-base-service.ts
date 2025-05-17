import { Observable } from "rxjs";
import { ICommand } from "./i-command";

export interface IBaseService {
    attachViewApiHandler<T>(): Observable<T>;
    attachCommandApiHandler<T>(): Observable<ICommand<T>>;
}
