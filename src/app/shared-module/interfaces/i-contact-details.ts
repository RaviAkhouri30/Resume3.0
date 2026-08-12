import { ContactType } from "../enums/contact-type";

export interface IContactDetails {
    icon: string;
    details: string;
    isCopied: boolean;
    type: ContactType;
}
