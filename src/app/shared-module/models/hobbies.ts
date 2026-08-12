import { IHobbies } from "../interfaces/i-hobbies";

export class Hobbies implements IHobbies {
    private _icon: string;
    private _hobby: string;

    constructor(hobby: IHobbies) {
        this._icon = hobby.icon;
        this._hobby = hobby.hobby;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(icon: string) {
        this._icon = icon;
    }

    public get hobby(): string {
        return this._hobby;
    }

    public set hobby(hobby: string) {
        this._hobby = hobby;
    }

}
