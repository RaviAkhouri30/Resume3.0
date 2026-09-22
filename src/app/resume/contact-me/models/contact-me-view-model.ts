import { Service } from "@angular/core";
import { ContactMe } from "src/app/shared-module/models/contact-me";
import { ViewModel } from "src/app/shared-module/models/view-model";

/** View model for the contact form; it has no remote data or commands yet. */
@Service()
export class ContactMeViewModel extends ViewModel<ContactMe> { }
