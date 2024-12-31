import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoader } from '../interfaces/i-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements ILoader {
  // BehaviorSubject to manage loading state
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Getter to retrieve the current loading state
  get isLoading(): boolean {
    return this._isLoading.value;
  }

  // Method to show the loader
  show = (): void => this._isLoading.next(true);
  
  // Method to hide the loader
  hide = (): void => this._isLoading.next(false);
}
