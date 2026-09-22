import { Observable } from "rxjs";
import { ICommand } from "./i-command";

export interface ICommandService {
    attachCommandApiHandler<T>(): Observable<ICommand<T>>;
}
