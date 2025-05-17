import { Component, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';
import { ViewModelContext } from '../../enums/view-model-context';
import { ViewModelFactory } from '../../factories/view-model-factory';

/**
 * BaseComponent is an abstract class that provides a base implementation for components.
 * It handles the initialization and automatic unsubscription of the model's observable.
 * 
 * @template T - The type of the data model.
 */
@Component({
  selector: 'app-base',
  template: '',
  standalone: false
})
export abstract class BaseComponent<T> implements OnDestroy {
  // Private property to hold the model
  private _model!: IViewModel<T>;

  // Subscription to manage observable
  private subscription!: Subscription;

  /**
   * The context for the ViewModel.
   * This property must be implemented by subclasses.
   */
  protected abstract readonly _context: ViewModelContext;

  /**
   * Constructor for the BaseComponent.
   * 
   * @param injector - The injector to be used for dependency injection.
   */
  constructor(protected injector: Injector) { }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the observable to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initializes the model by getting an instance from the ViewModelFactory
   * and sets up automatic unsubscription.
   */
  intializeModel(): void {
    this._model = ViewModelFactory.getViewModelInstance(this._context, this.injector);
    this.autoUnsubscribe();
  }

  /**
   * Method to automatically subscribe to the model's observable.
   * @private
   */
  private autoUnsubscribe = () => this.subscription = this.model.inIt().subscribe();

  /**
   * Getter for the model property.
   * 
   * @returns The model instance.
   */
  get model(): IViewModel<T> {
    return this._model;
  }
}
