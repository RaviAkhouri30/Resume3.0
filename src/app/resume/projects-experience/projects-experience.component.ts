import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { ProjectsExperienceViewModel } from './models/projects-experience-view-model';

@Component({
  selector: 'app-projects-experience',
  templateUrl: './projects-experience.component.html',
  styleUrl: './projects-experience.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TextMagnifierDirective],
  providers: [ProjectsExperienceViewModel]
})
export class ProjectsExperienceComponent extends BaseComponent<ProjectsExperienceViewModel> {
  protected readonly model = inject(ProjectsExperienceViewModel);
}
