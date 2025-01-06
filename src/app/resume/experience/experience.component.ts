import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ShowMessageDialogComponent } from 'src/app/shared-module/components/show-message-dialog/show-message-dialog.component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IExperienceDataModel } from 'src/app/shared-module/interfaces/i-experience-data-model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: false
})
export class ExperienceComponent extends BaseComponent<IExperienceDataModel[]> implements OnInit {

  protected override readonly _context: ViewModelContext = ViewModelContext.ExperienceComponent;

  private readonly dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.intializeModel();
  }

  public onReadMore = (title: string, message: string): void => {
    this.dialog.open(ShowMessageDialogComponent, { data: { title, message } });
  }

}
