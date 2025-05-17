import { Injector } from "@angular/core";
import { AboutMeViewModel } from "src/app/resume/about-me/models/about-me-view-model";
import { ViewModelContext } from "../enums/view-model-context";
import { ViewModel } from "../models/view-model";
import { ExperienceViewModel } from "src/app/resume/experience/models/experience-view-model";
import { EducationViewModel } from "src/app/resume/education/models/education-view-model";
import { ProfessionalSkillsViewModel } from "src/app/resume/professional-skills/models/professional-skills-view-model";
import { AwardsAndAchievemntsViewModel } from "src/app/resume/awards-and-achievements/models/awards-and-achievemnts-view-model";
import { HobbiesViewModel } from "src/app/resume/hobbies/models/hobbies-view-model";

export class ViewModelFactory {
    // Factory method to get the appropriate ViewModel instance based on the context
    static getViewModelInstance = (viewContext: ViewModelContext, injector: Injector): ViewModel<any> => {
        switch (viewContext) {
            case 0 /* AboutMeComponent */:
                return new AboutMeViewModel(injector);
            case 1 /* ExperienceComponent */:
                return new ExperienceViewModel(injector);
            case 2 /* EducationComponent */:
                return new EducationViewModel(injector);
            case 3 /* ProfessionalSkillsComponent */:
                return new ProfessionalSkillsViewModel(injector);
            case 4 /* AwardsAndAcheivementsComponents */:
                return new AwardsAndAchievemntsViewModel(injector);
            case 5 /* HobbiesComponents */:
                return new HobbiesViewModel(injector);
            default:
                throw new Error('Invalid ViewModel Context');
        }
    }
}
