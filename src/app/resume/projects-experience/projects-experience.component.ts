import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapProjectsToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { ProjectsExperienceDataModel } from 'src/app/shared-module/models/projects-experience-data-model';
import { ProjectsExperienceViewModel } from './models/projects-experience-model';

@Component({
  selector: 'app-projects-experience',
  standalone: false,
  templateUrl: './projects-experience.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './projects-experience.component.css',
})
export class ProjectsExperienceComponent extends BaseComponent<ProjectsExperienceDataModel[]> {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(ProjectsExperienceViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapProjectsToTimelineItem);
  }

}
