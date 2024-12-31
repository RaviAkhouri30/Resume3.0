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
export class NotificationService implements INotification {

  // Inject MatSnackBar instance
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  
  // Default horizontal position for the snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  
  // Default vertical position for the snackbar
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Method to show a message with an action in the snackbar
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
  showSuccess = (message: number): void => console.log(message);
  
  // Method to show an error message (currently logs to console)
  showError = (errorCode: number, message: string): void => console.error(message, errorCode);
}
