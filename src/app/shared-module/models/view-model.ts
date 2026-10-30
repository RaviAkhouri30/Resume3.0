import { Signal, signal, WritableSignal } from "@angular/core";
import { EMPTY, ignoreElements, merge, Observable } from "rxjs";
import { IViewModel } from "../interfaces/i-view-model";

/**
 * Base class for MVVM view models.
 *
 * - `data` is a read-only signal, so OnPush/zoneless views re-render exactly when
 *   the state changes and templates cannot mutate it.
 * - Subclasses override `attachViewHandler` / `attachCommandHandler` (as methods,
 *   so they participate in normal inheritance and can call `super`).
 */
export abstract class ViewModel<T> implements IViewModel<T> {
    private readonly _data: WritableSignal<T>;

    /** Current view state. */
    public readonly data: Signal<T>;

    protected constructor(initialData: T) {
        this._data = signal(initialData);
        this.data = this._data.asReadonly();
    }

    /** Starts the data and command streams for the lifetime of the subscription. */
    public init(): Observable<void> {
        return merge(this.attachViewHandler(), this.attachCommandHandler()).pipe(ignoreElements());
    }

    /** Loads the view state. */
    protected attachViewHandler(): Observable<unknown> {
        return EMPTY;
    }

    /** Executes commands issued by the view. */
    protected attachCommandHandler(): Observable<unknown> {
        return EMPTY;
    }

    /** Replaces the view state. */
    protected setData(value: T): void {
        this._data.set(value);
    }
}

/** View model whose state is a list, starting empty until data arrives. */
export abstract class CollectionViewModel<T> extends ViewModel<T[]> {
    protected constructor() {
        super([]);
    }
}
