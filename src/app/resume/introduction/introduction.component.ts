import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { IntroductionViewModel } from './models/introduction-view-model';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IntroductionViewModel]
})
export class IntroductionComponent extends BaseComponent<IntroductionViewModel> {
  protected readonly model = inject(IntroductionViewModel);
}
