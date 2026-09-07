import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-resume-container',
    templateUrl: './resume-container.component.html',
    styleUrls: ['./resume-container.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
/** Layout component that composes and arranges every resume section. */
export class ResumeContainerComponent {}
