import { Injectable } from '@angular/core';
import { INotification } from '../interfaces/i-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements INotification {

  constructor() { }

  showMessage = (message: number): void => console.log(message);
  showSuccess = (message: number): void => console.log(message);
  showError = (message: number): void => console.error(message);
}
