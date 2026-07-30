import { IExperienceDataModel } from "../interfaces/i-experience-data-model";

export class ExperienceDataModel implements IExperienceDataModel {
    private _personUid: string;
    private _uid: string;
    private _companyName: string;
    private _tenure: string;
    private _responsibilities: string[];

    constructor(data: IExperienceDataModel) {
        this._personUid = data.personUid;
        this._uid = data.uid;
        this._companyName = data.companyName;
        this._tenure = data.tenure;
        this._responsibilities = [...data.responsibilities].map(responsibility => responsibility as string);
    }

    get personUid(): string {
        return this._personUid;
    }

    get uid(): string {
        return this._uid;
    }

    get companyName(): string {
        return this._companyName;
    }

    set companyName(value: string) {
        this._companyName = value;
    }

    get tenure(): string {
        return this._tenure;
    }

    set tenure(value: string) {
        this._tenure = value;
    }

    get responsibilities(): string[] {
        return this._responsibilities;
    }

    set responsibilities(value: string[]) {
        this._responsibilities = value;
    }

}
