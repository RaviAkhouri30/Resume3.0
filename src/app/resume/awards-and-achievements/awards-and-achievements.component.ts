import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapAwardAndAchievementToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IAwardAchievements } from 'src/app/shared-module/interfaces/i-awards-achievements';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { AwardsAndAchievemntsViewModel } from './models/awards-and-achievemnts-view-model';

@Component({
  selector: 'app-awards-and-achievements',
  templateUrl: './awards-and-achievements.component.html',
  styleUrl: './awards-and-achievements.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AwardsAndAchievementsComponent extends BaseComponent<IAwardAchievements[]> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(AwardsAndAchievemntsViewModel);
  }

  ngOnInit(): void {
    this.inIt()
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapAwardAndAchievementToTimelineItem);
  }

}
