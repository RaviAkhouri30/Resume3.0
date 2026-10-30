import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ProfessionalSkillsViewModel } from './models/professional-skills-view-model';

/** Fewest items per marquee track, so a short skill list still spans a wide screen. */
const MIN_TRACK_ITEMS = 16;

@Component({
  selector: 'app-professional-skills',
  templateUrl: './professional-skills.component.html',
  styleUrl: './professional-skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfessionalSkillsViewModel]
})
export class ProfessionalSkillsComponent extends BaseComponent<ProfessionalSkillsViewModel> {
  protected readonly model = inject(ProfessionalSkillsViewModel);

  /** Skill names repeated until a track holds at least `MIN_TRACK_ITEMS`; only the first copy is announced. */
  protected readonly trackItems = computed(() => {
    const skills = this.model.data().map(item => item.skill);
    const copies = skills.length ? Math.ceil(MIN_TRACK_ITEMS / skills.length) : 0;
    return Array.from({ length: copies }, () => skills).flat();
  });

  protected readonly skillCount = computed(() => this.model.data().length);
}
