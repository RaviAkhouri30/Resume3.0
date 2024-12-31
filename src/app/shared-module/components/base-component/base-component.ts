import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';

@Component({
  selector: 'app-base',
  template: '',
  standalone: false
})
export class BaseComponent<T> implements OnDestroy {
  // Private property to hold the model
  private _model!: IViewModel<T>;
  
  // Subscription to manage observable
  private subscription!: Subscription;

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    this.subscription.unsubscribe();
  }

  // Method to automatically subscribe to the model's observable
  autoUnsubscribe = () => this.subscription = this.model.inIt().subscribe();

  // Setter for the model property
  set model(value: IViewModel<T>) {
    this._model = value;
  }

  // Getter for the model property
  get model(): IViewModel<T> {
    return this._model;
  }

}
