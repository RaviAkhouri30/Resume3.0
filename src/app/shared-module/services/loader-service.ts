import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoader } from '../interfaces/i-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements ILoader {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading(): boolean {
    return this._isLoading.value;
  }

  show = (): void => this._isLoading.next(true);
  hide = (): void => this._isLoading.next(false);
}
