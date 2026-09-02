import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapEducationToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IEducationDataModel } from 'src/app/shared-module/interfaces/i-education-data-model';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  standalone: false
})
export class EducationComponent extends BaseComponent<IEducationDataModel[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.EducationComponent;

  ngOnInit(): void {
    this.initializeModel();
  }


  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapEducationToTimelineItem);
  }

}
