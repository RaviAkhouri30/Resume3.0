import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared-module/services/notification.service';
import { ContactMeService } from '../services/contact-me.service';
import { ContactMeViewModel } from './contact-me-view-model';

describe('ContactMeViewModel', () => {
  let viewModel: ContactMeViewModel;
  let contactMeService: jasmine.SpyObj<ContactMeService>;
  let notification: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    contactMeService = jasmine.createSpyObj<ContactMeService>('ContactMeService', ['send']);
    notification = jasmine.createSpyObj<NotificationService>('NotificationService', ['showSuccess', 'showError']);
    TestBed.configureTestingModule({
      providers: [
        ContactMeViewModel,
        { provide: ContactMeService, useValue: contactMeService },
        { provide: NotificationService, useValue: notification }
      ]
    });
    viewModel = TestBed.inject(ContactMeViewModel);
    viewModel.init().subscribe();
  });

  const fillValidForm = () => viewModel.form.setValue({
    name: '  Jane  ', email: 'jane@example.com', message: 'Hello there', website: ''
  });

  it('does not send an invalid form and marks fields as touched', () => {
    viewModel.submit();

    expect(contactMeService.send).not.toHaveBeenCalled();
    expect(viewModel.form.controls.email.touched).toBeTrue();
  });

  it('sends trimmed values, then resets the form and reports success', () => {
    contactMeService.send.and.returnValue(of(undefined));
    fillValidForm();

    viewModel.submit();

    expect(contactMeService.send).toHaveBeenCalledOnceWith(jasmine.objectContaining({ name: 'Jane' }));
    expect(viewModel.data()).toBe('sent');
    expect(viewModel.form.controls.name.value).toBe('');
    expect(notification.showSuccess).toHaveBeenCalled();
  });

  it('keeps the form and reports a failure', () => {
    contactMeService.send.and.returnValue(throwError(() => ({ text: 'quota exceeded' })));
    fillValidForm();

    viewModel.submit();

    expect(viewModel.data()).toBe('failed');
    expect(viewModel.form.controls.message.value).toBe('Hello there');
    expect(notification.showError).toHaveBeenCalledOnceWith(400, 'quota exceeded');
  });

  it('silently drops submissions that fill the honeypot field', () => {
    viewModel.form.setValue({ name: 'Bot', email: 'bot@example.com', message: 'spam', website: 'http://spam' });

    viewModel.submit();

    expect(contactMeService.send).not.toHaveBeenCalled();
  });
});
