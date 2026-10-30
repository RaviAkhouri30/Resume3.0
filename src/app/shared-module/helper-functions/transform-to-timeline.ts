import { IAwardAchievements } from "../interfaces/i-awards-achievements";
import { IEducationDataModel } from "../interfaces/i-education-data-model";
import { IExperienceDataModel } from "../interfaces/i-experience-data-model";
import { IHobbiesDataModel } from "../interfaces/i-hobbies";
import { IProjectsExperienceDataModel } from "../interfaces/i-projects-experience-data-model";
import { ITimeline } from "../interfaces/i-timeline";

/** Joins the non-empty parts with a separator. */
function joinParts(parts: (string | undefined)[], separator: string): string {
    return parts.map(part => part?.trim()).filter(Boolean).join(separator);
}

export function mapAwardAndAchievementToTimelineItem(item: IAwardAchievements): ITimeline {
    return {
        subtitle: item.title,
        description: item.desc
    };
}

export function mapExperienceToTimelineItem(item: IExperienceDataModel): ITimeline {
    return {
        title: item.companyName,
        subtitle: joinParts([item.designation, item.tenure], ' · '),
        bullets: item.responsibilities
    };
}

export function mapEducationToTimelineItem(item: IEducationDataModel): ITimeline {
    const degree = item.major ? `${item.degree} in ${item.major}` : item.degree;
    return {
        title: item.graduationYear ? `${degree} (${item.graduationYear})` : degree,
        subtitle: joinParts([item.instituteName, item.university], ', '),
        description: item.grade ? `Grade: ${item.grade}` : undefined
    };
}

export function mapProjectsToTimelineItem(item: IProjectsExperienceDataModel): ITimeline {
    return {
        title: item.projectName,
        bullets: item.responsibilities
    };
}

export function mapHobbiesToTimelineItem(item: IHobbiesDataModel): ITimeline {
    return {
        subtitle: item.hobby,
        description: item.description,
        icon: item.icon
    };
}
