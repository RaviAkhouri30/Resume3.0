import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoader } from '../interfaces/i-loader';

@Injectable({
  providedIn: 'root'
})
/** Stores the application-wide loading state. */
export class LoaderService implements ILoader {
  // BehaviorSubject to manage loading state
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // Getter to retrieve the current loading state
  /** Returns the most recently emitted loading state. */
  get isLoading(): boolean {
    return this._isLoading.value;
  }

  // Method to show the loader
  /** Makes the loader visible. */
  show = (): void => this._isLoading.next(true);
  
  // Method to hide the loader
  /** Hides the loader. */
  hide = (): void => this._isLoading.next(false);
}
