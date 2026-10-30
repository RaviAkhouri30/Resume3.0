import { TestBed } from '@angular/core/testing';
import { ContactType } from 'src/app/shared-module/enums/contact-type';
import { Context } from 'src/app/shared-module/enums/context';
import { ContactDetailsDataModel } from 'src/app/shared-module/models/contact-details-data-model';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';
import { provideStubHttpBackend } from 'src/app/shared-module/testing/stub-http-backend';
import { ContactViewModel } from './contact-view-model';

describe('ContactViewModel', () => {
  let viewModel: ContactViewModel;
  let commandService: CommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactViewModel,
        CommandService,
        { provide: COMMAND_CONTEXT, useValue: Context.ContactDetails },
        provideStubHttpBackend({ 'contact-details': [{ icon: 'bi', details: 'a@b.in', type: 'email' }] })
      ]
    });
    viewModel = TestBed.inject(ContactViewModel);
    commandService = TestBed.inject(CommandService);
  });

  it('loads contacts as data models', () => {
    viewModel.init().subscribe();

    expect(viewModel.data()[0]).toBeInstanceOf(ContactDetailsDataModel);
    expect(viewModel.data()[0]?.href).toBe('mailto:a@b.in');
  });

  it('remembers the copied value and issues a labelled copy command', () => {
    spyOn(commandService, 'copyCommand');
    const contact = new ContactDetailsDataModel({ icon: '', details: '+91 1', type: ContactType.mobile });

    viewModel.copy(contact);

    expect(viewModel.copiedDetails()).toBe('+91 1');
    expect(commandService.copyCommand).toHaveBeenCalledOnceWith('+91 1', 'Phone number');
  });
});
