import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapEducationToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IEducationDataModel } from 'src/app/shared-module/interfaces/i-education-data-model';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { EducationViewModel } from './models/education-view-model';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';
import { Context } from 'src/app/shared-module/enums/context';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  providers: [
    EducationViewModel,
    { provide: COMMAND_CONTEXT, useValue: Context.Education },
    CommandService
  ]
})
export class EducationComponent extends BaseComponent<IEducationDataModel[]> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(EducationViewModel);
  }

  ngOnInit(): void {
    this.inIt()
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapEducationToTimelineItem);
  }

}
