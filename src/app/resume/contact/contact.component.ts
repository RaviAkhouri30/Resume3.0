import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { ContactViewModel } from './models/contact-view-model';
import { Context } from 'src/app/shared-module/enums/context';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextMagnifierDirective],
  providers: [ContactViewModel,
    { provide: COMMAND_CONTEXT, useValue: Context.ContactDetails },
    CommandService]
})
export class ContactComponent extends BaseComponent<ContactViewModel> {
  protected readonly model = inject(ContactViewModel);
}
