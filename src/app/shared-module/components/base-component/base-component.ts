import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';

/**
 * BaseComponent is an abstract class that provides a base implementation for components.
 * It handles the initialization and automatic unsubscription of the model's observable.
 * 
 * @template T - The type of the data model exposed to the component template.
 */
@Directive()
export abstract class BaseComponent<T> implements OnDestroy {
  // Private property to hold the model
  private _model!: IViewModel<T>;

  // Keep teardown safe when a component is destroyed before initialization.
  private subscription?: Subscription;

  /** Starts the view-model stream after the concrete component has injected it. */
  inIt() {
    this.autoUnsubscribe();
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the observable to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /** Subscribes once so the view model can load data and listen for commands. */
  private autoUnsubscribe = () => this.subscription = this.model.inIt().subscribe();

  /**
   * Getter for the model property.
   * 
   * @returns The model instance.
   */
  get model(): IViewModel<T> {
    return this._model;
  }

  set model(value: IViewModel<T>) {
    this._model = value;
  }


}
