import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { CardGridComponent } from 'src/app/shared-module/components/card-grid/card-grid.component';
import { ProjectsExperienceViewModel } from './models/projects-experience-view-model';

@Component({
  selector: 'app-projects-experience',
  templateUrl: './projects-experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardGridComponent],
  providers: [ProjectsExperienceViewModel]
})
export class ProjectsExperienceComponent extends BaseComponent<ProjectsExperienceViewModel> {
  protected readonly model = inject(ProjectsExperienceViewModel);
}
