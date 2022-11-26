import { Component, OnInit } from '@angular/core';
import { ExperienceModel } from './model/experience-model';
import { ExperienceService } from './service/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  private workExpData: ExperienceModel[];
  private expandedUid: string = ''
  private prevExpandedUid: string = ''

  constructor(
    private experienceService: ExperienceService
  ) {
    this.workExpData = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData = (): void => {
    this.experienceService.getData().subscribe((res: ExperienceModel[]) => {
      this.workExpData = [...res];
      console.log(this.workExpData);
    });
  }

  public getWorkExpData = (): ExperienceModel[] => {
    return this.workExpData;
  }

  public onReadMore = (uid: string): void => {
    this.onReadLess(uid);
    this.expandedUid = uid;
    if (document.getElementById(uid)) {
      const element = document.getElementById(uid) as HTMLDivElement;
      const _element = document.getElementById('cont' + uid) as HTMLDivElement;
      _element.style[<any>'overflow-y'] = 'scroll';
      _element.style[<any>'height'] = '75%';
      const _elementC = document.getElementById('_cont' + uid) as HTMLDivElement;
      _elementC.style.height = '100%';
      element.style.height = '300px';
    }
  }

  public onReadLess = (uid: string): void => {
    this.workExpData.forEach(e => {
      if(e.getUid() !== uid){
        if (document.getElementsByClassName(e.getUid())) {
          const element = document.getElementById(e.getUid()) as HTMLDivElement;
          const _element = document.getElementById('cont' + e.getUid()) as HTMLDivElement;
          _element.style[<any>'overflow-y'] = 'hidden';
          _element.style[<any>'height'] = '100%';
          const _elementC = document.getElementById('_cont' + e.getUid()) as HTMLDivElement;
          _elementC.style.height = '100%';
          element.style.height = '130px';
        }
      }
    });
  }

  public isExpanded = (): string => {
    return this.expandedUid;
  }

}
