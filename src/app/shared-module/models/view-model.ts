import { merge, Observable } from "rxjs";
import { IViewModel } from "../interfaces/i-view-model";

export abstract class ViewModel<T> implements IViewModel<T> {
    private _data!: T;

    /**
     * @discription This method is used to initialize the view model
     * @returns Observable<void>
     */
    inIt = (): Observable<void> => {
        return this.observe();
    }

    protected abstract attachViewHandler: () => Observable<any>;
    protected abstract attachCommandHandler: () => Observable<any>;

    get data(): T {
        return this._data;
    }

    set data(value: T) {
        this._data = value;
    }

    /**
     * @description This method is used to observe the view model
     * @returns Observable<void>
     */
    private observe = (): Observable<any> => {
        return merge(this.attachViewHandler(), this.attachCommandHandler());
    }

}
