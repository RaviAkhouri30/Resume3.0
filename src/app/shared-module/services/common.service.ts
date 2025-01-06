import { Injectable } from '@angular/core';
import { IPersonDataModel } from '../interfaces/i-person-data-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _aboutMeData: BehaviorSubject<IPersonDataModel>;

  constructor() { 
    this._aboutMeData = new BehaviorSubject<IPersonDataModel>({} as IPersonDataModel);
  }

  public set aboutMeData(data: IPersonDataModel) {
    this._aboutMeData.next(data);
  }

  public get aboutMeData(): BehaviorSubject<IPersonDataModel> {
    return this._aboutMeData;
  }

}
