import { inject, Injectable, InjectionToken } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, Subject, tap } from 'rxjs';
import { CopyCommand } from '../commands/copy-command';
import { Context } from '../enums/context';
import { ICommand } from '../interfaces/i-command';
import { NotificationService } from './notification.service';

/** Identifies the feature that issues commands through a component-scoped `CommandService`. */
export const COMMAND_CONTEXT = new InjectionToken<Context>('COMMAND_CONTEXT');

/**
 * Component-scoped command bus. Views queue commands; the owning view model
 * subscribes to `attachCommandApiHandler()` so side effects run only while the
 * view is alive.
 */
@Injectable()
export class CommandService {

    // A plain Subject: nothing is emitted until a command is actually issued.
    private readonly copyCommands = new Subject<ICommand<string>>();
    private readonly notificationService: NotificationService = inject(NotificationService);
    private readonly clipboard: Clipboard = inject(Clipboard);
    private readonly context: Context = inject(COMMAND_CONTEXT);

    /** Executes queued copy commands: copies the text verbatim and confirms it. */
    public attachCommandApiHandler(): Observable<ICommand<string>> {
        return this.copyCommands.pipe(
            tap(command => {
                if (this.clipboard.copy(command.dataItem)) {
                    this.notificationService.showMessage(command.message, command.command);
                }
            })
        );
    }

    /** Queues a copy command and its notification message. */
    public copyCommand(data: string, label: string): void {
        if (data) {
            this.copyCommands.next(new CopyCommand(this.context, data, label));
        }
    }
}
