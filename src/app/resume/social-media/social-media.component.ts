import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { SocialMediaViewModel } from './models/social-media-view-model';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SocialMediaViewModel]
})
export class SocialMediaComponent extends BaseComponent<SocialMediaViewModel> {
  protected readonly model = inject(SocialMediaViewModel);
}
