import { IAwardAchievements } from "./i-awards-achievements";

export interface IPersonDataModel {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    summary: string;
    linkedin: string;
    github: string;
    twitter: string;
    dateOfBirth: string;
    profilePic: string;
    resume: string;
    uid: string;
    hobbies: string[];
    awardsAndAchievements: IAwardAchievements[];
}