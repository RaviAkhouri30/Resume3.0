import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeContainerComponent } from './resume-container/resume-container.component';
import { SharedModule } from '../shared-module/shared.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProfessionalSkillsComponent } from './professional-skills/professional-skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EducationComponent } from './education/education.component';
import { AwardsAndAchievementsComponent } from './awards-and-achievements/awards-and-achievements.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

@NgModule({
    declarations: [
        ResumeContainerComponent,
        AboutMeComponent,
        ProfessionalSkillsComponent,
        ExperienceComponent,
        EducationComponent,
        AwardsAndAchievementsComponent,
        HobbiesComponent
    ],
    imports: [
        CommonModule,
        ResumeRoutingModule,
        SharedModule,
        FormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class ResumeModule { }
