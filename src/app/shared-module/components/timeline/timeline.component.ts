import { Component, input } from '@angular/core';
import { ITimeline } from '../../interfaces/i-timeline';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {

  public readonly timelineList = input.required<ITimeline[]>();

}
