import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapExperienceToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IExperienceDataModel } from 'src/app/shared-module/interfaces/i-experience-data-model';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { ExperienceViewModel } from './models/experience-view-model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ExperienceComponent extends BaseComponent<IExperienceDataModel[]> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(ExperienceViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapExperienceToTimelineItem);
  }

}
