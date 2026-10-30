import { IContactMe } from "../interfaces/i-contact-me";

/** Contact-form submission; values are trimmed so whitespace-only input is not sent. */
export class ContactMe implements IContactMe {
    public readonly name: string;
    public readonly email: string;
    public readonly message: string;

    constructor(data: Partial<IContactMe>) {
        this.name = (data.name ?? '').trim();
        this.email = (data.email ?? '').trim();
        this.message = (data.message ?? '').trim();
    }
}
