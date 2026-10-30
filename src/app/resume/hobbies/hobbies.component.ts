import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { CardGridComponent } from 'src/app/shared-module/components/card-grid/card-grid.component';
import { HobbiesViewModel } from './models/hobbies-view-model';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardGridComponent],
  providers: [HobbiesViewModel]
})
export class HobbiesComponent extends BaseComponent<HobbiesViewModel> {
  protected readonly model = inject(HobbiesViewModel);
}
