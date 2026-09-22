import { Inject, Injectable, InjectionToken, inject } from '@angular/core';
import { ICommandService } from '../interfaces/i-command-service';
import { ICommand } from '../interfaces/i-command';
import { BehaviorSubject, filter, map, merge, Observable, switchMap, tap } from 'rxjs';
import { IOpenDialogModel } from '../interfaces/i-open-dialog-model';
import { IDownload } from '../interfaces/i-download';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Context } from '../enums/context';
import { CopyCommand } from '../commands/copy-command';
import { DownloadCommand } from '../commands/download-command';
import { Clipboard } from '@angular/cdk/clipboard';

export const COMMAND_CONTEXT = new InjectionToken<Context>('COMMAND_CONTEXT');

@Injectable()
export class CommandService implements ICommandService {

    // BehaviorSubject to handle copy commands
    private readonly $copyCommandHandler: BehaviorSubject<ICommand<string>>;
    private readonly $openDialogModel: BehaviorSubject<ICommand<IOpenDialogModel<any>>>;
    private readonly $download: BehaviorSubject<ICommand<IDownload>>;
    private readonly $http: HttpClient = inject(HttpClient);

    // Injected NotificationService instance
    private readonly notificationService: NotificationService = inject(NotificationService);
    private readonly clipboard: Clipboard = inject(Clipboard);

    // Context of the service
    private context: Context;

    constructor(@Inject(COMMAND_CONTEXT) context: Context) {
        this.context = context;
        this.$copyCommandHandler = new BehaviorSubject<ICommand<string>>(new CopyCommand(this.context, '', ''));
        this.$openDialogModel = new BehaviorSubject(undefined as any);
        this.$download = new BehaviorSubject<ICommand<IDownload>>(new DownloadCommand(this.context, {} as IDownload));
    }

    /** Observes copy, dialog, and download commands for the feature context. */
    public attachCommandApiHandler<Tcommand extends ICommand<any>>(): Observable<Tcommand> {
        return merge(
            this.$copyCommandHandler.pipe(
                // Filter to ensure data item or multiple data items are present
                filter(data => Boolean(data.dataItem) || (data.multipleDataItems?.length ?? 0) > 0),
                // Tap to show notification message
                tap(data => this.clipboard.copy(data.dataItem.split(' ').join(''))),
                tap(data => this.notificationService.showMessage(data.message, data.command))
            ),
            this.$openDialogModel.pipe(),
            this.$download.pipe(
                filter(data => !!data && !!data.dataItem && !!data.dataItem.url),
                switchMap(data => this.$downloadCall(data.dataItem.url, data.dataItem.fileName)
                    .pipe(
                        map(downloadData => ({ downloadData, data }))
                    )),
                tap(data => this.notificationService.showSuccess(data.data.message))
            )
        ).pipe(
            map(data => data as Tcommand)
        )
    }


    /** Queues a copy command and its notification message. */
    public copyCommand(data: string, message: string): void {
        this.$copyCommandHandler.next(new CopyCommand(this.context, data, message));
    }

    /** Queues an empty dialog command for subscribers. */
    public openDialogModelCommand(): void {
        this.$openDialogModel.next({} as unknown as IOpenDialogModel<any>);
    }

    /** Queues a file download command. */
    public downloadCommand(url: string, fileName: string): void {
        this.$download.next(new DownloadCommand(this.context, ({ url, fileName })));
    }

    /** Downloads a file response and starts a browser download. */
    private $downloadCall = (url: string, fileName: string): Observable<Blob> => {
        return this.$http.get(url, {
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
