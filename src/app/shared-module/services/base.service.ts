import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { IBaseService } from '../interfaces/i-base-service';
import { ICommand } from '../interfaces/i-command';
import { Context } from '../enums/context';
import { CopyCommand } from '../commands/copy-command';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService implements IBaseService {

  // BehaviorSubject to handle copy commands
  private readonly _copyCommandHandler: BehaviorSubject<ICommand<any>>;
  
  // Context of the service
  private _context: Context;
  
  // Injected NotificationService instance
  private _notificationService: NotificationService = inject(NotificationService);

  // Constructor to initialize the context and copy command handler
  constructor(context: Context) {
    this._context = context;
    this._copyCommandHandler = new BehaviorSubject<ICommand<string>>(new CopyCommand(this._context, '', ''));
  }

  // Abstract method to attach view API handler
  public abstract attachViewApiHandler<T>(): Observable<T>;

  // Method to attach command API handler
  public attachCommandApiHandler<T>(): Observable<ICommand<T>> {
    return this._copyCommandHandler.pipe(
      // Filter to ensure data item or multiple data items are present
      filter(data => data.dataItem || data.multipleDataItems.length > 0),
      // Tap to show notification message
      tap(data => this._notificationService.showMessage(data.message, data.command)),
    );
  }

  // Method to execute copy command
  public copyCommand(data: string, message: string): void {
    this._copyCommandHandler.next(new CopyCommand(this._context, data, message));
  }

}
