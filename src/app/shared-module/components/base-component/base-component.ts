import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';

@Component({
  selector: 'app-base',
  template: '',
  standalone: false
})
export class BaseComponent<T> implements OnDestroy {
  private _model!: IViewModel<T>;
  private subscription!: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  autoUnsubscribe = () => this.subscription = this.model.inIt().subscribe();

  set model(value: IViewModel<T>) {
    this._model = value;
  }

  get model(): IViewModel<T> {
    return this._model;
  }

}
