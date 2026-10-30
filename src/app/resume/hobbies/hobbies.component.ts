import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { TextMagnifierDirective } from 'src/app/shared-module/directives/text-magnifier.directive';
import { TimelineComponent } from 'src/app/shared-module/components/timeline/timeline.component';
import { HobbiesViewModel } from './models/hobbies-view-model';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TextMagnifierDirective],
  providers: [HobbiesViewModel]
})
export class HobbiesComponent extends BaseComponent<HobbiesViewModel> {
  protected readonly model = inject(HobbiesViewModel);
}
