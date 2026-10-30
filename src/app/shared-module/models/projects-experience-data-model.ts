import { IProjectsExperienceDataModel } from "../interfaces/i-projects-experience-data-model";

export class ProjectsExperienceDataModel implements IProjectsExperienceDataModel {
    public readonly personUid: string;
    public readonly uid: string;
    public readonly projectName: string;
    public readonly responsibilities: string[];

    constructor(data: Partial<IProjectsExperienceDataModel>) {
        this.personUid = data.personUid ?? '';
        this.uid = data.uid ?? '';
        this.projectName = data.projectName ?? '';
        this.responsibilities = [...(data.responsibilities ?? [])];
    }
}
