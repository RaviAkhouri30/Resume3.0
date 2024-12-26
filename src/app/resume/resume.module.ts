import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeRoutingModule } from './resume-routing.module';
import { HeadSectionComponent } from './head-section/head-section.component';
import { ResumeContainerComponent } from './resume-container/resume-container.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProfessionalSkillsComponent } from './professional-skills/professional-skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EducationAwardsAndAcheivementComponent } from './education-awards-and-acheivement/education-awards-and-acheivement.component';

@NgModule({ declarations: [
        HeadSectionComponent,
        ResumeContainerComponent,
        AboutMeComponent,
        ProfessionalSkillsComponent,
        ExperienceComponent,
        EducationAwardsAndAcheivementComponent
    ], imports: [CommonModule,
        ResumeRoutingModule,
        SharedModuleModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ResumeModule { }
