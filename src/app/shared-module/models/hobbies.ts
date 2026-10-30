import { IHobbiesDataModel } from "../interfaces/i-hobbies";

export class Hobbies implements IHobbiesDataModel {
    public readonly icon: string;
    public readonly hobby: string;
    public readonly description: string;

    constructor(data: Partial<IHobbiesDataModel>) {
        this.icon = data.icon ?? '';
        this.hobby = data.hobby ?? '';
        this.description = data.description ?? '';
    }
}
