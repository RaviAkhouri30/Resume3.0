import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ProfessionalSkillsDataModel } from 'src/app/shared-module/models/professional-skills-data-model';
import { ProfessionalSkillsViewModel } from './models/professional-skills-view-model';

@Component({
  selector: 'app-professional-skills',
  templateUrl: './professional-skills.component.html',
  styleUrls: ['./professional-skills.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ProfessionalSkillsComponent extends BaseComponent<ProfessionalSkillsDataModel[]> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(ProfessionalSkillsViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

}
