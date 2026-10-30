import { Clipboard } from '@angular/cdk/clipboard';
import { TestBed } from '@angular/core/testing';
import { Context } from '../enums/context';
import { ICommand } from '../interfaces/i-command';
import { COMMAND_CONTEXT, CommandService } from './command-service';
import { NotificationService } from './notification.service';

describe('CommandService', () => {
  let service: CommandService;
  let clipboard: jasmine.SpyObj<Clipboard>;
  let notification: jasmine.SpyObj<NotificationService>;
  let executed: ICommand<string>[];

  beforeEach(() => {
    clipboard = jasmine.createSpyObj<Clipboard>('Clipboard', ['copy']);
    clipboard.copy.and.returnValue(true);
    notification = jasmine.createSpyObj<NotificationService>('NotificationService', ['showMessage']);
    TestBed.configureTestingModule({
      providers: [
        CommandService,
        { provide: COMMAND_CONTEXT, useValue: Context.ContactDetails },
        { provide: Clipboard, useValue: clipboard },
        { provide: NotificationService, useValue: notification }
      ]
    });
    service = TestBed.inject(CommandService);
    executed = [];
    service.attachCommandApiHandler().subscribe(command => executed.push(command));
  });

  it('does not emit anything until a command is issued', () => {
    expect(executed).toEqual([]);
    expect(clipboard.copy).not.toHaveBeenCalled();
  });

  it('copies the text verbatim, including spaces, and confirms it', () => {
    service.copyCommand('+91 88048 04868', 'Phone number');

    expect(clipboard.copy).toHaveBeenCalledOnceWith('+91 88048 04868');
    expect(notification.showMessage).toHaveBeenCalledOnceWith('Phone number copied!', 'Copy');
    expect(executed[0]?.context).toBe(Context.ContactDetails);
  });

  it('ignores empty values', () => {
    service.copyCommand('', 'Email');

    expect(executed).toEqual([]);
  });
});
