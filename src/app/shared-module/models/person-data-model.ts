import { IAwardAchievements } from "../interfaces/i-awards-achievements";
import { IHighlight } from "../interfaces/i-highlight";
import { IPersonDataModel } from "../interfaces/i-person-data-model";

/** Immutable profile; missing fields from the backend are normalised to safe defaults. */
export class PersonDataModel implements IPersonDataModel {
    public readonly firstName: string;
    public readonly name: string;
    public readonly email: string;
    public readonly secondaryEmail: string;
    public readonly phone: string;
    public readonly jobTitle: string;
    public readonly city: string;
    public readonly state: string;
    public readonly country: string;
    public readonly summary: string;
    public readonly linkedin: string;
    public readonly github: string;
    public readonly uid: string;
    public readonly careerStartDate: string;
    public readonly highlights: IHighlight[];
    public readonly awardsAndAchievements: IAwardAchievements[];

    constructor(data: Partial<IPersonDataModel>) {
        this.firstName = data.firstName ?? '';
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.secondaryEmail = data.secondaryEmail ?? '';
        this.phone = data.phone ?? '';
        this.jobTitle = data.jobTitle ?? '';
        this.city = data.city ?? '';
        this.state = data.state ?? '';
        this.country = data.country ?? '';
        this.summary = data.summary ?? '';
        this.linkedin = data.linkedin ?? '';
        this.github = data.github ?? '';
        this.uid = data.uid ?? '';
        this.careerStartDate = data.careerStartDate ?? '';
        this.highlights = [...(data.highlights ?? [])];
        this.awardsAndAchievements = [...(data.awardsAndAchievements ?? [])];
    }

    /** Whole years elapsed since `careerStartDate`, or `null` when it is unknown. */
    public yearsOfExperience(today: Date = new Date()): number | null {
        const start = new Date(this.careerStartDate);
        if (Number.isNaN(start.getTime())) {
            return null;
        }

        const months = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
        return Math.max(0, Math.floor(months / 12));
    }
}
