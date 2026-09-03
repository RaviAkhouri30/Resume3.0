import { Component, input } from '@angular/core';
import { ITimeline } from '../../interfaces/i-timeline';
import { TextMagnifierDirective } from '../../directives/text-magnifier.directive';

@Component({
  selector: 'app-timeline',
  imports: [TextMagnifierDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {

  public readonly timelineList = input.required<ITimeline[]>();

}
