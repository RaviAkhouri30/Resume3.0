import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapHobbiesToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IHobbiesDataModel } from 'src/app/shared-module/interfaces/i-hobbies';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  standalone: false
})
export class HobbiesComponent extends BaseComponent<IHobbiesDataModel[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.HobbiesComponent;

  ngOnInit(): void {
    this.initializeModel();
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapHobbiesToTimelineItem);
  }

}
