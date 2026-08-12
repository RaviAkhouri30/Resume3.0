import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, merge, Observable, tap } from 'rxjs';
import { IBaseService } from '../interfaces/i-base-service';
import { ICommand } from '../interfaces/i-command';
import { Context } from '../enums/context';
import { CopyCommand } from '../commands/copy-command';
import { NotificationService } from './notification.service';
import { IOpenDialogModel } from '../interfaces/i-open-dialog-model';
import { Clipboard } from '@angular/cdk/clipboard';
import { IFakeHttps as IHttps } from '../interfaces/i-fake-https';
import { HandleErrorFactory } from '../factories/handle-error-factory';
import { GetEndPointUrl } from '../functions/get-end-point-url';
import { UrlConstants } from '../constants/url-constants';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService implements IBaseService {

  // BehaviorSubject to handle copy commands
  private readonly _copyCommandHandler: BehaviorSubject<ICommand<string>>;
  private readonly _openDialogModel: BehaviorSubject<ICommand<IOpenDialogModel<any>>>;

  // Context of the service
  private _context: Context;

  // Injected NotificationService instance
  private readonly _notificationService: NotificationService = inject(NotificationService);
  private readonly _clipboard: Clipboard = inject(Clipboard);

  private readonly _http: IHttps = inject(IHttps);
  private readonly _handleErrorFactory: HandleErrorFactory = inject(HandleErrorFactory);

  // Constructor to initialize the context and copy command handler
  constructor(context: Context) {
    this._context = context;
    this._copyCommandHandler = new BehaviorSubject<ICommand<string>>(new CopyCommand(this._context, '', ''));
    this._openDialogModel = new BehaviorSubject(undefined as any);
  }

  // Abstract method to attach view API handler
  public abstract attachViewDataHandler<T>(): Observable<T>;

  public attachViewApiHandler<T>(url: UrlConstants): Observable<T> {
    return this._handleErrorFactory.handleHttpsError(this._http.get<T>(GetEndPointUrl.getEndPointUrl(url))).pipe(
      filter((res) => res?.ok && res?.body !== null),
      map((res) => res.body as T)
    );
  };

  // Method to attach command API handler
  public attachCommandApiHandler<Tcommand extends ICommand<any>>(): Observable<Tcommand> {
    return merge(
      this._copyCommandHandler.pipe(
        // Filter to ensure data item or multiple data items are present
        filter(data => Boolean(data.dataItem) || (data.multipleDataItems?.length ?? 0) > 0),
        // Tap to show notification message
        tap(data => this._clipboard.copy(data.dataItem.split(' ').join(''))),
        tap(data => this._notificationService.showMessage(data.message, data.command))
      ),
      this._openDialogModel.pipe()
    ).pipe(
      map(data => data as Tcommand)
    )
  }

  // Method to execute copy command
  public copyCommand(data: string, message: string): void {
    this._copyCommandHandler.next(new CopyCommand(this._context, data, message));
  }

  public openDialogModelCommand(): void {
    this._openDialogModel.next({} as unknown as IOpenDialogModel<any>)
  }

}
