import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IEducationDataModel } from 'src/app/shared-module/interfaces/i-education-data-model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  standalone: false
})
export class EducationComponent extends BaseComponent<IEducationDataModel[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.EducationComponent;

  ngOnInit(): void {
    this.intializeModel();
  }

}
