import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapAwardAndAchievementToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IAwardAchievements } from 'src/app/shared-module/interfaces/i-awards-achievements';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';

@Component({
  selector: 'app-awards-and-achievements',
  templateUrl: './awards-and-achievements.component.html',
  styleUrl: './awards-and-achievements.component.css',
  standalone: false
})
export class AwardsAndAchievementsComponent extends BaseComponent<IAwardAchievements[]> implements OnInit {
  protected override _context: ViewModelContext = ViewModelContext.AwardsAndAchievementsComponent;

  ngOnInit(): void {
    this.initializeModel();
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapAwardAndAchievementToTimelineItem);
  }

}
