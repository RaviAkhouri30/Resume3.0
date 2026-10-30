import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profilePhoto } from 'src/app/shared-module/helper-functions/media';
import { environment } from 'src/environments/environment';
import { AboutMeComponent } from '../about-me/about-me.component';
import { AwardsAndAchievementsComponent } from '../awards-and-achievements/awards-and-achievements.component';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { ContactComponent } from '../contact/contact.component';
import { EducationComponent } from '../education/education.component';
import { ExperienceComponent } from '../experience/experience.component';
import { HobbiesComponent } from '../hobbies/hobbies.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { PersonalProjectsComponent } from '../personal-projects/personal-projects.component';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { ProfessionalSkillsComponent } from '../professional-skills/professional-skills.component';
import { ProjectsExperienceComponent } from '../projects-experience/projects-experience.component';
import { SocialMediaComponent } from '../social-media/social-media.component';

/** Layout component that composes and arranges every resume section. */
@Component({
  selector: 'app-resume-container',
  templateUrl: './resume-container.component.html',
  styleUrl: './resume-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeaderComponent,
    IntroductionComponent,
    ProfessionalSkillsComponent,
    AwardsAndAchievementsComponent,
    AboutMeComponent,
    ExperienceComponent,
    ProjectsExperienceComponent,
    PersonalProjectsComponent,
    HobbiesComponent,
    EducationComponent,
    ContactComponent,
    // Only referenced inside `@defer`, so it and Angular Forms/Material form-field
    // are split into a chunk that loads when the footer scrolls into view.
    ContactMeComponent,
    SocialMediaComponent
  ]
})
export class ResumeContainerComponent {
  protected readonly currentYear = new Date().getFullYear();
  /** Rendered in a 360px frame (see `.portrait`); keep the preload in index.html in sync. */
  protected readonly photo = profilePhoto(environment.media, 360);
}
