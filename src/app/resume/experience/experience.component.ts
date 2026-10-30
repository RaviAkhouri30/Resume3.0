import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { ExperienceViewModel } from './models/experience-view-model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent],
  providers: [ExperienceViewModel]
})
export class ExperienceComponent extends BaseComponent<ExperienceViewModel> {
  protected readonly model = inject(ExperienceViewModel);
}
