import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ContactType } from "src/app/shared-module/enums/contact-type";
import { ContactDetailsDataModel } from "src/app/shared-module/models/contact-details-data-model";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { CommandService } from "src/app/shared-module/services/command-service";
import { ContactService } from "../services/contact.service";

const COPY_LABELS: Record<ContactType, string> = {
    [ContactType.email]: 'Email',
    [ContactType.mobile]: 'Phone number'
};

@Injectable()
export class ContactViewModel extends CollectionViewModel<ContactDetailsDataModel> {

    private readonly contactService: ContactService = inject(ContactService);
    private readonly commandService: CommandService = inject(CommandService);
    private readonly _copiedDetails = signal<string | null>(null);

    /** The contact value most recently copied to the clipboard. */
    public readonly copiedDetails = this._copiedDetails.asReadonly();

    constructor() {
        super();
    }

    /** Copies a contact value and remembers it so the view can show a confirmation icon. */
    public copy(contact: ContactDetailsDataModel): void {
        this._copiedDetails.set(contact.details);
        this.commandService.copyCommand(contact.details, COPY_LABELS[contact.type] ?? 'Contact');
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.contactService.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(contact => new ContactDetailsDataModel(contact))))
        );
    }

    protected override attachCommandHandler(): Observable<unknown> {
        return this.commandService.attachCommandApiHandler();
    }
}
