import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, merge, Observable, switchMap, tap } from 'rxjs';
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
import { HttpClient } from '@angular/common/http';
import { DownloadCommand } from '../commands/download-command';
import { IDownload } from '../interfaces/i-download';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService implements IBaseService {

  // BehaviorSubject to handle copy commands
  private readonly copyCommandHandler: BehaviorSubject<ICommand<string>>;
  private readonly openDialogModel: BehaviorSubject<ICommand<IOpenDialogModel<any>>>;
  private readonly download: BehaviorSubject<ICommand<IDownload>>;

  // Context of the service
  private context: Context;

  // Injected NotificationService instance
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly clipboard: Clipboard = inject(Clipboard);

  private readonly http: HttpClient = inject(HttpClient);
  private readonly fakeHttp: IHttps = inject(IHttps);
  private readonly handleErrorFactory: HandleErrorFactory = inject(HandleErrorFactory);

  // Constructor to initialize the context and copy command handler
  constructor(context: Context) {
    this.context = context;
    this.copyCommandHandler = new BehaviorSubject<ICommand<string>>(new CopyCommand(this.context, '', ''));
    this.openDialogModel = new BehaviorSubject(undefined as any);
    this.download = new BehaviorSubject<ICommand<IDownload>>(new DownloadCommand(this.context, {} as IDownload));
  }

  // Abstract method to attach view API handler
  public abstract attachViewDataHandler<T>(): Observable<T>;

  public attachViewApiHandler<T>(url: UrlConstants): Observable<T> {
    return this.handleErrorFactory.handleHttpsError(this.fakeHttp.get<T>(GetEndPointUrl.getEndPointUrl(url))).pipe(
      filter((res) => res?.ok && res?.body !== null),
      map((res) => res.body as T)
    );
  };

  // Method to attach command API handler
  public attachCommandApiHandler<Tcommand extends ICommand<any>>(): Observable<Tcommand> {
    return merge(
      this.copyCommandHandler.pipe(
        // Filter to ensure data item or multiple data items are present
        filter(data => Boolean(data.dataItem) || (data.multipleDataItems?.length ?? 0) > 0),
        // Tap to show notification message
        tap(data => this.clipboard.copy(data.dataItem.split(' ').join(''))),
        tap(data => this.notificationService.showMessage(data.message, data.command))
      ),
      this.openDialogModel.pipe(),
      this.download.pipe(
        filter(data => !!data && !!data.dataItem && !!data.dataItem.url),
        switchMap(data => this.downloadCall(data.dataItem.url, data.dataItem.fileName))
      )
    ).pipe(
      map(data => data as Tcommand)
    )
  }

  // Method to execute copy command
  public copyCommand(data: string, message: string): void {
    this.copyCommandHandler.next(new CopyCommand(this.context, data, message));
  }

  public openDialogModelCommand(): void {
    this.openDialogModel.next({} as unknown as IOpenDialogModel<any>);
  }

  public downloadCommand(url: string, fileName: string): void {
    this.download.next(new DownloadCommand(this.context, ({ url, fileName })));
  }

  private downloadCall = (url: string, fileName: string): Observable<Blob> => {
    return this.http.get(url, {
      responseType: 'blob'
    }).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName ?? 'Blank';
        a.click();

        window.URL.revokeObjectURL(url);
      })
    );
  }

}
