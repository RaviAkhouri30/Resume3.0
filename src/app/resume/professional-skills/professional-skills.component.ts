import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IProfessionalSkillsDataModel } from 'src/app/shared-module/interfaces/i-professional-skills';

@Component({
    selector: 'app-professional-skills',
    templateUrl: './professional-skills.component.html',
    styleUrls: ['./professional-skills.component.css'],
    standalone: false
})
export class ProfessionalSkillsComponent extends BaseComponent<IProfessionalSkillsDataModel[]> implements OnInit {
  protected override _context: ViewModelContext = ViewModelContext.ProfessionalSkillsComponent;

  ngOnInit(): void {
    this.intializeModel();
  }

}
