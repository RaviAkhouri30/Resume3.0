import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IProjectsExperienceDataModel } from 'src/app/shared-module/interfaces/i-projects-experience-data-model';

@Component({
  selector: 'app-projects-experience',
  standalone: false,
  templateUrl: './projects-experience.component.html',
  styleUrl: './projects-experience.component.css',
})
export class ProjectsExperienceComponent extends BaseComponent<IProjectsExperienceDataModel[]> {

  protected override readonly _context: ViewModelContext = ViewModelContext.ProjectsExperienceComponent;

  // private readonly dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.intializeModel();
  }

  // public onReadMore = (title: string, message: string[]): void => {
  //   this.dialog.open(ShowMessageDialogComponent, { data: { title, message } });
  // }

}
