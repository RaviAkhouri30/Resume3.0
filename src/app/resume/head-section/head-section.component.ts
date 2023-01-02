import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentModel } from 'src/app/shared-module/components/model/component-model';
import { HeadSectionModel } from './model/head-section-model';
import { HeadSectionService } from './services/head-section.service';

@Component({
  selector: 'app-head-section',
  templateUrl: './head-section.component.html',
  styleUrls: ['./head-section.component.css']
})
export class HeadSectionComponent implements OnInit, ComponentModel<HeadSectionModel>, OnDestroy {
  /** Variables */
  private data: HeadSectionModel;
  private _subscribtion!: Subscription;

  /** Constructor */
  constructor(
    private headSectionService: HeadSectionService
  ) {
    this.data = new HeadSectionModel();
  }

  /**
   * Angular First Life Cycle Hook
   * @description Use to Fetch Data.
   */
  public ngOnInit(): void {
    this.fetchData();
  }

  /**
   * @description To Fetch the Data.
   */
  public fetchData = (): void => {
    this._subscribtion = this.headSectionService.getHeadData().subscribe(res => {
      if (res.getStatusCode() === 200) {
        this.data.setDesignation(res.getData().getDesignation());
        this.data.setRole(res.getData().getRole());
        this.data.setUserName(res.getData().getUserName());
      }
    })
  }

  /**
   * @description getter for data
   * @returns Data of Type Generic T, Here Type is HeadSectionModel
   */
  public getData = (): HeadSectionModel => {
    return this.data;
  };

  /**
   * @description Last Life cycle hook of Angular, executed when component is destroyed.
   * Use to unsubscribe the Subscribtion.
   */
  ngOnDestroy(): void {
    if (this._subscribtion) {
      this._subscribtion.unsubscribe();
    }
  }

  public onDownload = (): void => {
    window.open('/assets/RAVI_RESUME.pdf');
  }

}
