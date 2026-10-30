import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { AboutMeViewModel } from './models/about-me-view-model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AboutMeViewModel]
})
export class AboutMeComponent extends BaseComponent<AboutMeViewModel> {
  protected readonly model = inject(AboutMeViewModel);
}
