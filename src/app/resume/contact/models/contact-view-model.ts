import { Injector } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IContactDetails } from "src/app/shared-module/interfaces/i-contact-details";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ContactService } from "../services/contact.service";
import { ContactDetailsDataModel } from "src/app/shared-module/models/contact-details-data-model";

export class ContactViewModel extends ViewModel<IContactDetails[]> {

    private readonly _contactService: ContactService;

    constructor(protected injector: Injector) {
        super();
        this._contactService = injector.get(ContactService);
    }

    protected override attachViewHandler = (): Observable<any> => {
        return this._contactService.attachViewDataHandler<IContactDetails[]>().pipe(
            tap(result => this.data = result.map(contact => new ContactDetailsDataModel(contact)))
        );
    }

    protected override attachCommandHandler = (): Observable<any> => {
        return this._contactService.attachCommandApiHandler();
    }
}
