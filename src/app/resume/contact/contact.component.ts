import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { IContactDetails } from 'src/app/shared-module/interfaces/i-contact-details';
import { ContactService } from './services/contact.service';
import { ContactViewModel } from './models/contact-view-model';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.css',
})
export class ContactComponent extends BaseComponent<IContactDetails[]> implements OnInit {

  private readonly _contactService: ContactService = inject(ContactService);

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

    this._contactService.copyCommand(contact.details, contact.type);
  }

}
