import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapExperienceToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { IExperienceDataModel } from 'src/app/shared-module/interfaces/i-experience-data-model';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: false
})
export class ExperienceComponent extends BaseComponent<IExperienceDataModel[]> implements OnInit {

  protected override readonly _context: ViewModelContext = ViewModelContext.ExperienceComponent;

  // private readonly dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.initializeModel();
  }

  // public onReadMore = (title: string, message: string[]): void => {
  //   this.dialog.open(ShowMessageDialogComponent, { data: { title, message } });
  // }


  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapExperienceToTimelineItem);
  }

}
