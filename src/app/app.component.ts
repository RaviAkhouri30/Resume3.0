import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeContainerComponent } from './resume/resume-container/resume-container.component';
import { LoaderService } from './shared-module/services/loader-service';

/** Root component that hosts the resume page and the global loading overlay. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResumeContainerComponent]
})
export class AppComponent {

  protected readonly loader: LoaderService = inject(LoaderService);

}
