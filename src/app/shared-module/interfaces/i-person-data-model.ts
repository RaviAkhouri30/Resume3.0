import { IAwardAchievements } from "./i-awards-achievements";
import { IHighlight } from "./i-highlight";

export interface IPersonDataModel {
    firstName: string;
    name: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    jobTitle: string;
    city: string;
    state: string;
    country: string;
    summary: string;
    linkedin: string;
    github: string;
    uid: string;
    /** ISO date (`YYYY-MM-DD`) the career started; years of experience are derived from it. */
    careerStartDate: string;
    /** Headline figures shown in the About section, e.g. projects delivered. */
    highlights: IHighlight[];
    awardsAndAchievements: IAwardAchievements[];
}
