import { ContactType } from "../enums/contact-type";
import { IContactDetails } from "../interfaces/i-contact-details";

export class ContactDetailsDataModel implements IContactDetails {
    public readonly icon: string;
    public readonly details: string;
    public readonly type: ContactType;

    constructor(data: IContactDetails) {
        this.icon = data.icon;
        this.details = data.details;
        this.type = data.type;
    }

    /** Link target for the contact, e.g. `mailto:` or `tel:` (spaces removed for dialers). */
    public get href(): string {
        return this.type === ContactType.mobile
            ? `tel:${this.details.replace(/[^\d+]/g, '')}`
            : `mailto:${this.details}`;
    }
}
