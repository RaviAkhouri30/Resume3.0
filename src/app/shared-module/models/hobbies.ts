import { IHobbiesDataModel } from "../interfaces/i-hobbies";

export class Hobbies implements IHobbiesDataModel {
    private _icon: string;
    private _hobby: string;
    private _description: string;

    constructor(hobby: IHobbiesDataModel) {
        this._icon = hobby.icon;
        this._hobby = hobby.hobby;
        this._description = hobby.description;
    }

    public get description() {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
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
