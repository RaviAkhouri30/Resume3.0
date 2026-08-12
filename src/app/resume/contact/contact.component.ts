import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IContactDetails } from 'src/app/shared-module/interfaces/i-contact-details';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent extends BaseComponent<IContactDetails[]> implements OnInit {

  private readonly _contactService: ContactService = inject(ContactService);
  protected readonly _context: ViewModelContext = ViewModelContext.ContactDetailsComponent;

  constructor(
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.intializeModel();
  }

  onCopyDetails(contact: IContactDetails) {
    this.model.data.map(_contact => {
      if (contact.details === _contact.details) {
        _contact.isCopied = true;
        return;
      }
      _contact.isCopied = false;
    });

    this._contactService.copyCommand(contact.details, contact.type);
  }

}
