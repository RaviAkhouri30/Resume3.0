import { IContactMe } from "../interfaces/i-contact-me";

export class ContactMe implements IContactMe {
    private _name: string;
    private _email: string;
    private _message: string;

    constructor() {
        this._name = '';
        this._email = '';
        this._message = ''
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        if (typeof name !== 'string') {
            return;
        }
        this._name = name;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        if (typeof email !== 'string') {
            return;
        }
        this._email = email;
    }

    public get message(): string {
        return this._message;
    }

    public set message(message: string) {
        if (typeof message !== 'string') {
            return;
        }
        this._message = message;
    }

}
