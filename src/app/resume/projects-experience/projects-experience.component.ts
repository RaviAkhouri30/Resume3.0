import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { mapToTimelineItems } from 'src/app/shared-module/helper-functions/map-to-timeline-items';
import { mapProjectsToTimelineItem } from 'src/app/shared-module/helper-functions/transform-to-timeline';
import { ITimeline } from 'src/app/shared-module/interfaces/i-timeline';
import { ProjectsExperienceDataModel } from 'src/app/shared-module/models/projects-experience-data-model';

@Component({
  selector: 'app-projects-experience',
  standalone: false,
  templateUrl: './projects-experience.component.html',
  styleUrl: './projects-experience.component.css',
})
export class ProjectsExperienceComponent extends BaseComponent<ProjectsExperienceDataModel[]> {

  protected override readonly _context: ViewModelContext = ViewModelContext.ProjectsExperienceComponent;

  // private readonly dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.initializeModel();
  }

  // public onReadMore = (title: string, message: string[]): void => {
  //   this.dialog.open(ShowMessageDialogComponent, { data: { title, message } });
  // }


  get transformedTimelineItems(): ITimeline[] {
    return mapToTimelineItems(this.model.data, mapProjectsToTimelineItem);
  }

}
