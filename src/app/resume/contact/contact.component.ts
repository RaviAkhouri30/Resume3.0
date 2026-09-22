import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { IContactDetails } from 'src/app/shared-module/interfaces/i-contact-details';
import { ContactViewModel } from './models/contact-view-model';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';
import { Context } from 'src/app/shared-module/enums/context';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.css',
  providers: [
    ContactViewModel,
    { provide: COMMAND_CONTEXT, useValue: Context.ContactDetails },
    CommandService
  ]
})
export class ContactComponent extends BaseComponent<IContactDetails[]> implements OnInit {

  private readonly _commandService: CommandService = inject(CommandService);

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(ContactViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  onCopyDetails(contact: IContactDetails) {
    this.model.data.map(_contact => {
      if (contact.details === _contact.details) {
        _contact.isCopied = true;
        return;
      }
      _contact.isCopied = false;
    });

    this._commandService.copyCommand(contact.details, contact.type);
  }

}
