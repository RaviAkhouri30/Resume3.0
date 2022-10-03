import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  /**
   * @description progress should be in percentage. Min Value can be 0 and Max can be 100.
   */
  @Input() progress: number| string = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public getProgessBarWidth = (): string => {
    return this.progress + '%';
  }

}
