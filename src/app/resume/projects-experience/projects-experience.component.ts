import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
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

}
