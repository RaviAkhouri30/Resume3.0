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
        title: item.title,
        description: item.desc
    };
}

export function mapExperienceToTimelineItem(item: IExperienceDataModel): ITimeline {
    return {
        title: item.companyName,
        subtitle: item.designation,
        meta: item.tenure,
        bullets: item.responsibilities
    };
}

export function mapEducationToTimelineItem(item: IEducationDataModel): ITimeline {
    const degree = item.major ? `${item.degree} in ${item.major}` : item.degree;
    return {
        title: degree,
        subtitle: joinParts([item.instituteName, item.university], ', '),
        meta: item.graduationYear || undefined,
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
        title: item.hobby,
        description: item.description,
        icon: item.icon
    };
}
