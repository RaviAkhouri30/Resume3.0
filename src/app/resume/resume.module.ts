import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeContainerComponent } from './resume-container/resume-container.component';
import { SharedModule } from '../shared-module/shared.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProfessionalSkillsComponent } from './professional-skills/professional-skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from './education/education.component';
import { AwardsAndAchievementsComponent } from './awards-and-achievements/awards-and-achievements.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { ProjectsExperienceComponent } from './projects-experience/projects-experience.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ExperienceGraphComponent } from './experience-graph/experience-graph.component';
import { ContactComponent } from './contact/contact.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button';

@NgModule({
    declarations: [
        ResumeContainerComponent,
        AboutMeComponent,
        ProfessionalSkillsComponent,
        ExperienceComponent,
        EducationComponent,
        AwardsAndAchievementsComponent,
        HobbiesComponent,
        ProjectsExperienceComponent,
        IntroductionComponent,
        ExperienceGraphComponent,
        ContactComponent,
        SocialMediaComponent,
        ContactMeComponent
    ],
    imports: [
        CommonModule,
        ResumeRoutingModule,
        SharedModule,
        FormsModule,
        MatInputModule,
        MatButton,
        ReactiveFormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class ResumeModule { }
