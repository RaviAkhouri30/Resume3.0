import { inject, Injectable } from '@angular/core';
import { INotification } from '../interfaces/i-notification';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
/** Displays application notifications through Angular Material snack bars. */
export class NotificationService implements INotification {

  // Inject MatSnackBar instance
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  
  // Default horizontal position for the snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  
  // Default vertical position for the snackbar
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Method to show a message with an action in the snackbar
  /** Opens a snack bar and automatically dismisses it after three seconds. */
  showMessage = (message: string, action: string): void => {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    // Automatically dismiss the snackbar after 3 seconds
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 3000);
  };

  // Method to show a success message (currently logs to console)
  /** Logs a success result until a dedicated success UI is introduced. */
  showSuccess = (message: number): void => console.log(message);
  
  // Method to show an error message (currently logs to console)
  /** Logs an error until a dedicated error UI is introduced. */
  showError = (errorCode: number, message: string): void => console.error(message, errorCode);
}
