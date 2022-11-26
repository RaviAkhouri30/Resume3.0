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

  constructor(
    private experienceService: ExperienceService
  ) {
    this.workExpData = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData = (): void => {
    this.experienceService.getData().subscribe((res:ExperienceModel[]) => {
      this.workExpData = [...res];
      console.log(this.workExpData);
    });
  }

  public getWorkExpData = (): ExperienceModel[] => {
    return this.workExpData;
  }

  public onReadMore = (uid: string): void => {
    if(document.getElementById(uid)){
      const element = document.getElementById(uid) as HTMLDivElement;
      const _element = document.getElementById('cont' + uid) as HTMLDivElement;
      _element.style[<any>'--max-height'] = '100%';
      _element.style.overflow = 'visible';
      const _elementC = document.getElementById('_cont' + uid) as HTMLDivElement;
      _elementC.style.height = '100%';
      _elementC.style.overflow = 'visible';
      element.style.height = '200px';
    }
  }

}
