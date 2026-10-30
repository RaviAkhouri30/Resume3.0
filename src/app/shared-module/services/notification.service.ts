import { inject, Injectable } from '@angular/core';
import { INotification } from '../interfaces/i-notification';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/** How long a notification stays visible. */
const NOTIFICATION_DURATION_MS = 3000;

/** Displays application notifications through Angular Material snack bars. */
@Injectable({
  providedIn: 'root'
})
export class NotificationService implements INotification {

  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  /** Shows an informational message with an action label. */
  public showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, this.config());
  }

  /** Shows a success message. */
  public showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', this.config('success-msg'));
  }

  /** Shows a user-friendly error and logs the technical detail for debugging. */
  public showError(errorCode: number, message: string): void {
    console.error(`[${errorCode}] ${message}`);
    this.snackBar.open('Something went wrong. Please try again later.', 'Dismiss', this.config('error-msg'));
  }

  // `duration` lets the snack bar close itself; dismissing via a timer could close a newer message.
  private config(panelClass?: string): MatSnackBarConfig {
    return {
      duration: NOTIFICATION_DURATION_MS,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass
    };
  }
}
