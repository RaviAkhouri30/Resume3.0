import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { CardGridComponent } from 'src/app/shared-module/components/card-grid/card-grid.component';
import { EducationViewModel } from './models/education-view-model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardGridComponent],
  providers: [EducationViewModel]
})
export class EducationComponent extends BaseComponent<EducationViewModel> {
  protected readonly model = inject(EducationViewModel);
}
