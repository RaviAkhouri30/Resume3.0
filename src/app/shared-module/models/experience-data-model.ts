import { IExperienceDataModel } from "../interfaces/i-experience-data-model";

export class ExperienceDataModel implements IExperienceDataModel {
    public readonly personUid: string;
    public readonly uid: string;
    public readonly companyName: string;
    public readonly designation: string;
    public readonly tenure: string;
    public readonly responsibilities: string[];

    constructor(data: Partial<IExperienceDataModel>) {
        this.personUid = data.personUid ?? '';
        this.uid = data.uid ?? '';
        this.companyName = data.companyName ?? '';
        this.designation = data.designation ?? '';
        this.tenure = data.tenure ?? '';
        this.responsibilities = [...(data.responsibilities ?? [])];
    }
}
