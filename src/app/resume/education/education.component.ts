import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { EducationViewModel } from './models/education-view-model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TextMagnifierDirective],
  providers: [EducationViewModel]
})
export class EducationComponent extends BaseComponent<EducationViewModel> {
  protected readonly model = inject(EducationViewModel);
}
