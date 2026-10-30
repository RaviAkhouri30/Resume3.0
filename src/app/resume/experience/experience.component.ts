import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { ExperienceViewModel } from './models/experience-view-model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TextMagnifierDirective],
  providers: [ExperienceViewModel]
})
export class ExperienceComponent extends BaseComponent<ExperienceViewModel> {
  protected readonly model = inject(ExperienceViewModel);
}
