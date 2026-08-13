import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { ContactMe } from 'src/app/shared-module/models/contact-me';

@Component({
  selector: 'app-contact-me',
  standalone: false,
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
})
/** Displays and validates the contact form. Submission is currently local only. */
export class ContactMeComponent extends BaseComponent<ContactMe> implements OnInit {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private _form!: FormGroup;

  protected readonly _context: ViewModelContext = ViewModelContext.ContactMe;

  /** Creates the form and initializes its view model when the component loads. */
  ngOnInit(): void {
    this.createForm();
    this.initializeModel();
  }

  /** Returns the reactive form used by the contact section. */
  get form(): FormGroup {
    return this._form;
  }

  /** Copies validated form values into the contact view model. */
  public onSend() {
    if (!this.form.valid) {
      return;
    }
    this.model.data = new ContactMe();
    const formVal = this.form.value as ContactMe;
    this.model.data.name = formVal.name;
    this.model.data.email = formVal.email;
    this.model.data.message = formVal.message;
    console.log(this.model.data, '  test submit');
  }

  /** Builds the required name, email, and message controls. */
  private createForm(): void {
    this._form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
}
