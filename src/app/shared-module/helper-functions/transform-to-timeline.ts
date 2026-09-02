import { IAwardAchievements } from "../interfaces/i-awards-achievements";
import { IEducationDataModel } from "../interfaces/i-education-data-model";
import { IExperienceDataModel } from "../interfaces/i-experience-data-model";
import { IHobbiesDataModel } from "../interfaces/i-hobbies";
import { IProjectsExperienceDataModel } from "../interfaces/i-projects-experience-data-model";
import { ITimeline } from "../interfaces/i-timeline";

export function mapAwardAndAchievementToTimelineItem(item: IAwardAchievements): ITimeline {
    return {
        subtitle: item.title,
        description: item.desc
    };
}

export function mapExperienceToTimelineItem(item: IExperienceDataModel): ITimeline {
    return {
        title: item.companyName,
        subtitle: item.tenure,
        bullets: item.responsibilities
    };
}

export function mapEducationToTimelineItem(item: IEducationDataModel): ITimeline {
    return {
        title: item.degree + " in " + item.major + ' (' + item.graduationYear + ')',
        subtitle: item.instituteName + ', ' + item.university,
        description: 'Grade: ' + item.grade
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