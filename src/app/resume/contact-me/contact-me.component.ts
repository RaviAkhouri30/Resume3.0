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
export class ContactMeComponent extends BaseComponent<ContactMe> implements OnInit {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private _form!: FormGroup;

  protected readonly _context: ViewModelContext = ViewModelContext.ContactMe;

  ngOnInit(): void {
    this.createForm();
    this.intializeModel();
  }

  get form(): FormGroup {
    return this._form;
  }

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

  private createForm(): void {
    this._form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
}
