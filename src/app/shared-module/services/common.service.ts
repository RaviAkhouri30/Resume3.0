import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPersonDataModel } from '../interfaces/i-person-data-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly _aboutMeData: BehaviorSubject<IPersonDataModel>;

  constructor() {
    this._aboutMeData = new BehaviorSubject<IPersonDataModel>({} as IPersonDataModel);
  }

  public set aboutMeData(data: IPersonDataModel) {
    this._aboutMeData.next(data);
  }

  public get aboutMeData(): Observable<IPersonDataModel> {
    return this._aboutMeData.asObservable();
  }

}
