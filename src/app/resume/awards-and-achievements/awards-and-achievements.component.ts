import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { CardGridComponent } from 'src/app/shared-module/components/card-grid/card-grid.component';
import { AwardsAndAchievementsViewModel } from './models/awards-and-achievements-view-model';

@Component({
  selector: 'app-awards-and-achievements',
  templateUrl: './awards-and-achievements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardGridComponent],
  providers: [AwardsAndAchievementsViewModel]
})
export class AwardsAndAchievementsComponent extends BaseComponent<AwardsAndAchievementsViewModel> {
  protected readonly model = inject(AwardsAndAchievementsViewModel);
}
