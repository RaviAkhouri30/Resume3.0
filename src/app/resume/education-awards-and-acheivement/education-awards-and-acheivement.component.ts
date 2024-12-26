import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentModel } from 'src/app/shared-module/components/model/component-model';
import { statusCodeType } from 'src/app/shared-module/models/response-model';
import { EduAwardAcheivementModel } from './model/edu-award-acheivement-model';
import { EduAwardAcheivementService } from './services/edu-award-acheivement.service';

@Component({
    selector: 'app-education-awards-and-acheivement',
    templateUrl: './education-awards-and-acheivement.component.html',
    styleUrls: ['./education-awards-and-acheivement.component.css'],
    standalone: false
})
export class EducationAwardsAndAcheivementComponent implements OnInit, OnDestroy, ComponentModel<EduAwardAcheivementModel[]> {

  private data: EduAwardAcheivementModel[];
  private eduSubscribtion!: Subscription;
  private awardsData: string[];

  constructor(
    private eduAwardAcheivementService: EduAwardAcheivementService
  ) {
    this.data = [];
    this.awardsData = [];
  }

  ngOnInit(): void {
    this.fetchData();
  }

  public getData = (): EduAwardAcheivementModel[] => {
    return this.data;
  }

  public getAwardsData = (): string[] => {
    return this.awardsData;
  }

  public fetchData = (): void => {
    this.eduSubscribtion = this.eduAwardAcheivementService.getEducationAndAcheivementData().subscribe(res => {
      if (res.getStatusCode() === statusCodeType.success) {
        this.data = res.getData().map(e => new EduAwardAcheivementModel(e));
      }
    });
    this.eduAwardAcheivementService.getAwardsAndAchievement().subscribe(res => {
      if (res.getStatusCode() === statusCodeType.success) {
        this.awardsData = [...res.getData()];
      }
    });
  };

  public ngOnDestroy(): void {
    if (this.eduSubscribtion) {
      this.eduSubscribtion.unsubscribe();
    }
  }
}
