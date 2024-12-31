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

  private readonly _copyCommandHandler: BehaviorSubject<ICommand<any>>;
  private _context: Context;
  private _notificationService: NotificationService = inject(NotificationService);

  constructor(context: Context) {
    this._context = context;
    this._copyCommandHandler = new BehaviorSubject<ICommand<string>>(new CopyCommand(this._context, '', ''));
  }

  public abstract attachViewApiHandler<T>(): Observable<T>;

  public attachCommandApiHandler<T>(): Observable<ICommand<T>> {
    return this._copyCommandHandler.pipe(
      filter(data => data.dataItem || data.multipleDataItems.length > 0),
      tap(data => this._notificationService.showMessage(data.message, data.command)),
    );
  }

  public copyCommand(data: string, message: string): void {
    this._copyCommandHandler.next(new CopyCommand(this._context, data, message));
  }

}
