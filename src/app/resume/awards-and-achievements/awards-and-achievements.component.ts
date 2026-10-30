import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { AwardsAndAchievementsViewModel } from './models/awards-and-achievements-view-model';

@Component({
  selector: 'app-awards-and-achievements',
  templateUrl: './awards-and-achievements.component.html',
  styleUrl: './awards-and-achievements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TextMagnifierDirective],
  providers: [AwardsAndAchievementsViewModel]
})
export class AwardsAndAchievementsComponent extends BaseComponent<AwardsAndAchievementsViewModel> {
  protected readonly model = inject(AwardsAndAchievementsViewModel);
}
