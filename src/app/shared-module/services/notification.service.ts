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

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showMessage = (message: string, action: string): void => {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 3000);
  };

  showSuccess = (message: number): void => console.log(message);
  showError = (errorCode: number, message: string): void => console.error(message, errorCode);
}
