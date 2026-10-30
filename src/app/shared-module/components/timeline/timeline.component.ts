import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ITimeline } from '../../interfaces/i-timeline';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {

  public readonly timelineList = input.required<ITimeline[]>();

  /** Bullets shown before the rest collapse behind a "Show more" toggle. */
  public readonly visibleBullets = input(4);

}
