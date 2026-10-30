import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LivePreviewComponent } from 'src/app/shared-module/components/live-preview/live-preview.component';
import { IPersonalProject } from 'src/app/shared-module/interfaces/i-personal-project';
import { PERSONAL_PROJECTS } from './models/personal-projects';

/** Hobby projects, each with a description and a live preview of the running site. */
@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrl: './personal-projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LivePreviewComponent]
})
export class PersonalProjectsComponent {

  protected readonly projects: IPersonalProject[] = PERSONAL_PROJECTS;

  /**
   * True when this page is itself running inside a preview frame (this site previews itself).
   * The nested copy then shows placeholders instead of loading further previews.
   */
  protected readonly embedded = globalThis.self !== globalThis.top;

}
