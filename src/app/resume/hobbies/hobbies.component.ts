import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapHobbiesToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IHobbiesDataModel } from 'src/app/shared-module/interfaces/i-hobbies';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { HobbiesViewModel } from './models/hobbies-view-model';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HobbiesComponent extends BaseComponent<IHobbiesDataModel[]> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(HobbiesViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapHobbiesToTimelineItem);
  }

}
