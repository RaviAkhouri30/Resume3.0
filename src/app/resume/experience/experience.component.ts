import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IExperienceDataModel } from 'src/app/shared-module/interfaces/i-experience-data-model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: false
})
export class ExperienceComponent extends BaseComponent<IExperienceDataModel[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.ExperienceComponent;

  ngOnInit(): void {
    this.intializeModel();
  }

}
