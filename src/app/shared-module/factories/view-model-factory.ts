import { Injector } from "@angular/core";
import { AboutMeViewModel } from "src/app/resume/about-me/models/about-me-view-model";
import { ViewModelContext } from "../enums/view-model-context";
import { ViewModel } from "../models/view-model";
import { ExperienceViewModel } from "src/app/resume/experience/models/experience-view-model";
import { EducationViewModel } from "src/app/resume/education/models/education-view-model";
import { ProfessionalSkillsViewModel } from "src/app/resume/professional-skills/models/professional-skills-view-model";
import { AwardsAndAchievemntsViewModel } from "src/app/resume/awards-and-achievements/models/awards-and-achievemnts-view-model";
import { HobbiesViewModel } from "src/app/resume/hobbies/models/hobbies-view-model";
import { ProjectsExperienceViewModel } from "src/app/resume/projects-experience/models/projects-experience-model";
import { IntroductionViewModel } from "src/app/resume/introduction/models/introduction-view-model";
import { SocialMediaModel } from "src/app/resume/social-media/models/social-media-model";
import { ContactViewModel } from "src/app/resume/contact/models/contact-view-model";
import { ContactMeViewModel } from "src/app/resume/contact-me/models/contact-me-view-model";

/**
 * @deprecated Resume components now inject their view models directly. This
 * adapter remains only for callers that still provide a ViewModelContext.
 */
/** Maps a legacy resume-section context to a DI-managed view-model instance. */
export class ViewModelFactory {
    /** Creates a view model from the caller's injection context. */
    static getViewModelInstance = (viewContext: ViewModelContext, injector: Injector): ViewModel<any> => {
        switch (viewContext) {
            case ViewModelContext.AboutMeComponent /* AboutMeComponent */:
                return injector.get(AboutMeViewModel);
            case ViewModelContext.ExperienceComponent /* ExperienceComponent */:
                return injector.get(ExperienceViewModel);
            case ViewModelContext.EducationComponent /* EducationComponent */:
                return injector.get(EducationViewModel);
            case ViewModelContext.ProfessionalSkillsComponent /* ProfessionalSkillsComponent */:
                return injector.get(ProfessionalSkillsViewModel);
            case ViewModelContext.ProjectsExperienceComponent /* ProjectsComponent */:
                return injector.get(ProjectsExperienceViewModel);
            case ViewModelContext.AwardsAndAchievementsComponent /* AwardsAndAcheivementsComponents */:
                return injector.get(AwardsAndAchievemntsViewModel);
            case ViewModelContext.HobbiesComponent /* HobbiesComponents */:
                return injector.get(HobbiesViewModel);
            case ViewModelContext.IntroductionComponent:
                return injector.get(IntroductionViewModel);
            case ViewModelContext.SocialMedia:
                return injector.get(SocialMediaModel);
            case ViewModelContext.ContactDetailsComponent:
                return injector.get(ContactViewModel);
            case ViewModelContext.ContactMe:
                return injector.get(ContactMeViewModel);
            case ViewModelContext.Default:
                throw new Error('Invalid ViewModel Context');
            default:
                throw new Error('Invalid ViewModel Context');
        }
    }
}
