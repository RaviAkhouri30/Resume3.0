import { ContactType } from "../enums/contact-type";
import { IContactDetails } from "../interfaces/i-contact-details";

export class ContactDetailsDataModel implements IContactDetails {
    private _icon: string;
    private _details: string;
    private _isCopied: boolean = false;
    private _type: ContactType;

    constructor(data: IContactDetails) {
        this._icon = data.icon;
        this._details = data.details;
        this._type = data.type;
    }

    public get type(): ContactType {
        return this._type;
    }

    public set type(type: ContactType) {
        this._type = type;
    }

    public get isCopied(): boolean {
        return this._isCopied;
    }

    public set isCopied(isCopied: boolean) {
        this._isCopied = isCopied;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(icon: string) {
        this._icon = icon;
    }

    public get details(): string {
        return this._details;
    }

    public set details(details: string) {
        this._details = details;
    }

}
