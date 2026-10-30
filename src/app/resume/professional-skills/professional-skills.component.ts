import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { ProfessionalSkillsViewModel } from './models/professional-skills-view-model';

@Component({
  selector: 'app-professional-skills',
  templateUrl: './professional-skills.component.html',
  styleUrl: './professional-skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextMagnifierDirective],
  providers: [ProfessionalSkillsViewModel]
})
export class ProfessionalSkillsComponent extends BaseComponent<ProfessionalSkillsViewModel> {
  protected readonly model = inject(ProfessionalSkillsViewModel);
}
