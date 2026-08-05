import { IProjectsExperienceDataModel } from "../interfaces/i-projects-experience-data-model";

export class ProjectsExperienceDataModel implements IProjectsExperienceDataModel {
    private _personUid: string;
    private _uid: string;
    private _projectName: string;
    private _responsibilities: string[];

    constructor(data: IProjectsExperienceDataModel) {
        this._personUid = data.personUid;
        this._uid = data.uid;
        this._projectName = data.projectName;
        this._responsibilities = [...data.responsibilities].map(responsibility => responsibility as string);
    }

    get personUid(): string {
        return this._personUid;
    }

    get uid(): string {
        return this._uid;
    }

    get projectName(): string {
        return this._projectName;
    }

    set projectName(value: string) {
        this._projectName = value;
    }

    get responsibilities(): string[] {
        return this._responsibilities;
    }

    set responsibilities(value: string[]) {
        this._responsibilities = value;
    }
}
