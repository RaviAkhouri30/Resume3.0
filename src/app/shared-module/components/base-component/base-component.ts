import { Component, Injector, OnDestroy } from '@angular/core';
import { HanldeErrorFactory } from '../../factories/hanlde-error-factory';
import { Subscription } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnDestroy {
  private _hanldeErrorFactory: HanldeErrorFactory;
  private _model!: IViewModel;
  private subscription!: Subscription;

  constructor(protected injector: Injector) {
    this._hanldeErrorFactory = this.injector.get(HanldeErrorFactory);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  autoUnsubscribe = () => {
    this.subscription = this.handleHttpError().subscribe();
    this.subscription.unsubscribe();
  }

  set model(value: IViewModel) {
    this._model = value;
  }

  get model(): IViewModel {
    return this._model;
  }

  private handleHttpError = () => this._hanldeErrorFactory.handleHttpsError(this._model.inIt());
}
