import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ContactMeViewModel } from './models/contact-me-view-model';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatInputModule],
  providers: [ContactMeViewModel]
})
export class ContactMeComponent extends BaseComponent<ContactMeViewModel> {
  protected readonly model = inject(ContactMeViewModel);
}
