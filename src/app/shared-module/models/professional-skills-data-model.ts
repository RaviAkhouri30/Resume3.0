import { IProfessionalSkillsDataModel } from "../interfaces/i-professional-skills";

export class ProfessionalSkillsDataModel implements IProfessionalSkillsDataModel {
    public readonly personUid: string;
    public readonly uid: string;
    public readonly skill: string;

    constructor(data: Partial<IProfessionalSkillsDataModel>) {
        this.personUid = data.personUid ?? '';
        this.uid = data.uid ?? '';
        this.skill = data.skill ?? '';
    }
}
