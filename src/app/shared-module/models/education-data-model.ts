import { IEducationDataModel } from "../interfaces/i-education-data-model";

/** Education or certification entry; `major` and `grade` may be empty. */
export class EducationDataModel implements IEducationDataModel {
    public readonly personUid: string;
    public readonly uid: string;
    public readonly degree: string;
    public readonly major: string;
    public readonly university: string;
    public readonly instituteName: string;
    public readonly graduationYear: string;
    public readonly grade: string;

    constructor(data: Partial<IEducationDataModel>) {
        this.personUid = data.personUid ?? '';
        this.uid = data.uid ?? '';
        this.degree = data.degree ?? '';
        this.major = data.major ?? '';
        this.university = data.university ?? '';
        this.instituteName = data.instituteName ?? '';
        this.graduationYear = data.graduationYear ?? '';
        this.grade = data.grade ?? '';
    }
}
