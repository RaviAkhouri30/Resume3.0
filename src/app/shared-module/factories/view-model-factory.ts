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

/** Maps a resume-section context to its corresponding view-model implementation. */
export class ViewModelFactory {
    /** Creates a view model with the injector required by its dependencies. */
    static getViewModelInstance = (viewContext: ViewModelContext, injector: Injector): ViewModel<any> => {
        switch (viewContext) {
            case ViewModelContext.AboutMeComponent /* AboutMeComponent */:
                return new AboutMeViewModel(injector);
            case ViewModelContext.ExperienceComponent /* ExperienceComponent */:
                return new ExperienceViewModel(injector);
            case ViewModelContext.EducationComponent /* EducationComponent */:
                return new EducationViewModel(injector);
            case ViewModelContext.ProfessionalSkillsComponent /* ProfessionalSkillsComponent */:
                return new ProfessionalSkillsViewModel(injector);
            case ViewModelContext.ProjectsExperienceComponent /* ProjectsComponent */:
                return new ProjectsExperienceViewModel(injector);
            case ViewModelContext.AwardsAndAchievementsComponent /* AwardsAndAcheivementsComponents */:
                return new AwardsAndAchievemntsViewModel(injector);
            case ViewModelContext.HobbiesComponent /* HobbiesComponents */:
                return new HobbiesViewModel(injector);
            case ViewModelContext.IntroductionComponent:
                return new IntroductionViewModel(injector);
            case ViewModelContext.SocialMedia:
                return new SocialMediaModel(injector);
            case ViewModelContext.ContactDetailsComponent:
                return new ContactViewModel(injector);
            case ViewModelContext.ContactMe:
                return new ContactMeViewModel();
            default:
                throw new Error('Invalid ViewModel Context');
        }
    }
}
