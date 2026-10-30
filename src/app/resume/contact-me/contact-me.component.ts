import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ContactMeViewModel } from './models/contact-me-view-model';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, TextMagnifierDirective],
  providers: [ContactMeViewModel]
})
export class ContactMeComponent extends BaseComponent<ContactMeViewModel> {
  protected readonly model = inject(ContactMeViewModel);
}
